import Head from "next/head"
import Link from "next/link"
import useAuth from "../hooks/useAuth"


function Plans() {
    const { logout, user } = useAuth()

    return (
        <div>
            <Head>
                <title>Netflix App_TS</title>
            </Head>
            <header className="border-b border-white/10 bg=[#141414]">
                <Link href="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt="main logo"
                        height={100}
                        width={100}
                        className="object-contain cursor-pointer " />
                </Link>
                <button
                    className="text-lg font-medium hover:underline"
                    onClick={logout}>Logout </button>
            </header>

            <main>
                <h1 className="mb-3 text-3xl font-medium">Choose the plan that's right for you</h1>
            </main>
        </div >
    )
}

export default Plans