import { EmptyMemories } from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import ptBr from "dayjs/locale/pt-br";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
dayjs.locale(ptBr);

interface Memory {
  id: string;
  coverUrl: string;
  createdAt: string;
  excerpt: string;
}

export default async function Home() {
  const isAuthenticated = cookies().has("token");

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }
  const token = cookies().get("token")?.value;
  const reponse = await api.get("/memories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const memories: Memory[] = reponse.data;
  if (memories.length === 0) return <EmptyMemories />;
  
  // TODO: Add edit memory
  // TODO: Add delete memory
  // TODO: Add Share memory
  // TODO: Add image date picker
  // TODO: Add responsiveness
  // TODO: Add see more option
  
  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map(({ coverUrl, createdAt, excerpt, id }) => (
        <div key={id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(createdAt).format("D[ de ]MMMM[, ]YYYY")}
          </time>
          <Image src={coverUrl} alt="" width={598} height={280} className="w-full aspect-video object-cover rounded-lg"/>
          <p className="text-lg leading-relaxed text-gray-100">{excerpt}</p>
          <Link href={`/memories/${id}`} className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100">
            Ler mais
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}
