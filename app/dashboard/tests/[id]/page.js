import { getTestById } from "@/queries/tests";
import { TitleForm } from "./_components/title-form";
import { QAForm } from "./_components/qa-form";
import { AddQAForm } from "./_components/add-qa-form";
import { TestActions } from "./_components/test-actions";
import AlertBanner from "@/components/alert-banner";

const page = async ({ params: id }) => {
  const test = await getTestById(id);

  return (
    <>
      {!test?.active && (
        <AlertBanner
          label="This test is unpublished. It will not be visible in the Questions."
          variant="warning"
        />
      )}
      <div className="flex flex-col-reverse items-end p-5">
        <div className="md:flex flex-row gap-5 items-start justify-between w-full">
          <div>
            <TitleForm initialData={{ title: test?.title }} testId={test.id} />
            {test?.questions.map((q) => (
              <QAForm
                key={q.id}
                initialData={{
                  question: q.question,
                  answer: q.answer,
                  topic: q.topic,
                  difficulty: q.difficulty,
                  id: q.id,
                }}
                testId={test?.id}
              />
            ))}
          </div>
          <AddQAForm testId={test.id} />
        </div>
        <TestActions testId={test.id} isActive={test?.active} />
      </div>
    </>
  );
};

export default page;
