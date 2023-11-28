import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Table, TableBody, TableCell } from "@radix-ui/themes";
import IssueActions from "./IssueActions";

interface Props {
  searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <TableBody>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <TableCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </TableCell>
            </Table.Row>
          ))}
        </TableBody>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
