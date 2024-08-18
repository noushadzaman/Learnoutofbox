import { auth } from "@/auth";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { getTestsByCreator } from "@/queries/tests";

const page = async () => {
  const session = await auth();
  const tests = await getTestsByCreator({ creator: session?.user?.email });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={tests} />
    </div>
  );
};

export default page;
