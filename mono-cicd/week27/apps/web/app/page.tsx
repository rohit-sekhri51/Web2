import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { prisma } from "db/client";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default async function Home() {

  const users = await prisma.user.findMany();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ThemeImage
          className={styles.logo}
          srcLight="turborepo-dark.svg"
          srcDark="turborepo-light.svg"
          alt="Turborepo logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>apps/web/app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Turborepo&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Monorepo+with+Turborepo&repository-name=monorepo-turborepo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fturborepo%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=vercel&utm_source=create-turbo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://turbo.build/repo/docs?utm_source"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
        <Button appName="web" className={styles.secondary}>
          Open alert
        </Button>
        <div>
          <h2>All USERS</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://turbo.build?utm_source=create-turbo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to turbo.build →
        </a>
      </footer>
    </div>
  );
}

export const revalidate = 60 // revalidate every 60 seconds, making it no more static (ISG), w/o it , it is static (SSG)
// or Incremental Site Generation (ISG) can be forced on every request by setting the revalidate property to a dynamic value like 'force-dynamic'
// export const dynamic = 'force-dynamic'

/*  
  The above code is a Next.js page that uses the Prisma client to fetch all users from the database and display them in a list. 
  
  The page also includes a revalidate property that sets the page to revalidate every 60 seconds to ensure the data is up to date.
  In Next.js, the revalidate property can be used to set the revalidation interval for static pages.
  bun run dev, it reflects the dynamic data from the database.
  bun run build, it generates a static page with the initial data fetched at build time.
  bun run start, it serves the static page and revalidates the data every 60 seconds.
  The revalidate property can be set to a number of seconds or a dynamic value like 'force-dynamic' to revalidate on every request.
  Using the The revalidate property, there is no difference b/w (bun dev) and (bun build + bun start)
  Earlier, bun dev was dynamic and bun build + bun start was static.
  Hence, dockerfile in production should have the revalidate property set to a dynamic value like 'force-dynamic' to ensure the data is always up to date.
  */ 