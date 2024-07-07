import { getLoggedInUser } from "@/lib/loggedin-user";
import { Watch } from "@/model/watch-model";
import { getLesson } from "@/queries/lesson";
import { getModuleBySlug } from "@/queries/modules";
import { createWatchReport } from "@/queries/reports";
import { NextResponse } from "next/server";

const STARTED = "started";
const COMPLETED = "completed";

async function updateReport(userId, courseId, moduleId, lessonId) {
  try {
    await createWatchReport({ userId, courseId, moduleId, lessonId });
  } catch (error) {
    throw new Error(error);
  }
}

export async function POST(request) {
  const { courseId, lessonId, moduleSlug, state, lastTime } =
    await request.json();

  const loggedInUser = await getLoggedInUser();
  const lesson = await getLesson(lessonId);
  const singleModule = await getModuleBySlug(moduleSlug);

  if (!loggedInUser) {
    return new NextResponse(`You are not authenticated`, {
      status: 401,
    });
  }
  if (state !== STARTED && state !== COMPLETED) {
    return new NextResponse(`Invalid state! can not process request.`, {
      status: 500,
    });
  }
  if (!lesson) {
    return new NextResponse(`Invalid lesson! can not process request.`, {
      status: 500,
    });
  }

  const watchEntry = {
    lastTime,
    lesson: lesson.id,
    module: singleModule.id,
    user: loggedInUser.id,
    state,
  };

  try {
    const found = await Watch.findOne({
      lesson: lessonId,
      module: singleModule.id,
      user: loggedInUser.id,
    }).lean();

    if (state === STARTED) {
      if (!found) {
        watchEntry["created_at"] = Date.now();
        await Watch.create(watchEntry);
      }
    } else if (state === COMPLETED) {
      if (!found) {
        watchEntry["created_at"] = Date.now();
        await Watch.create(watchEntry);
        await updateReport(
          loggedInUser.id,
          courseId,
          singleModule.id,
          lessonId
        );
      } else {
        if (found.state === STARTED) {
          watchEntry["modified_at"] = Date.now();
          await Watch.findByIdAndUpdate(found._id, { state: COMPLETED });
          await updateReport(
            loggedInUser.id,
            courseId,
            singleModule.id,
            lessonId
          );
        }
      }
    }
    return new NextResponse(`Watch record updated successfully!`, {
      status: 200,
    });
  } catch (e) {
    return new NextResponse(`${e.message}`, {
      status: 500,
    });
  }
}
