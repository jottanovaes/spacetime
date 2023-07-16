import Link from "next/link";

export function Copyright() {
  return (
    <div>
      Feito com 💜 no NLW da{" "}
      <Link
        href="https://rocketseat.com.br"
        className="hover:text-gry-100 underline"
        target="_blank"
        rel="noreferrer"
      >
        Rocketseat
      </Link>
    </div>
  );
}
