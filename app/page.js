import Exam from "@/components/Exam";
import { getCourses } from "@/queries/courses";

export default async function Home() {
  const courses = await getCourses();
  console.log("social", courses[0]?.instructor?.socialMedia);
  console.log("testi", courses[0]?.testimonials);
  console.log("modi", courses[0]?.modules);
  return <Exam />;
}
