import Image from "next/image";
import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer id="blog" className="border-t border-white/10 bg-[#0f0e0c]">
      <div className="grid w-full gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-10 xl:px-16 2xl:px-20">
        <div>
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/logo.png"
              alt="Promptiny"
              width={210}
              height={56}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#a9a39a]">
            A curated prompt discovery product for freelancers, creators,
            designers, builders, and growing teams.
          </p>
        </div>
        <FooterColumn
          title="Product"
          links={[
            ["Library", "/collections"],
            ["Collections", "/collections"],
            ["Categories", "/collections#filters"],
            ["Pricing", "/#pricing"],
          ]}
        />
        <FooterColumn
          title="Resources"
          links={[
            ["Blog", "/#blog"],
            ["Prompt Guide", "/collections"],
            ["Submit Prompt", "/#submit"],
          ]}
        />
        <FooterColumn
          title="Account"
          links={[
            ["Sign in", "/signin"],
            ["Create account", "/signin"],
          ]}
        />
      </div>
      <div className="w-full border-t border-white/10 px-5 py-5 text-sm text-[#777067] md:px-10 xl:px-16 2xl:px-20">
        Copyright 2026 promptiny.online. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[#f7f3ea]">{title}</h3>
      <div className="mt-4 grid gap-3">
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="text-sm text-[#a9a39a] transition hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
