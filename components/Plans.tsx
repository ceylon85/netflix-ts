import { CheckIcon } from "@heroicons/react/outline"
import Head from "next/head"
import Link from "next/link"
import useAuth from "../hooks/useAuth"
import Table from "./Table"


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

            <main className="max-w-5xl px-5 pb-12 mx-auto transition-all pt-28 md:px-10">
                <h1 className="mb-3 text-3xl font-medium ">Choose the plan that's right for you</h1>
                <ul>
                    <li className="flex items-center text-lg gap-x-2">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
                        Ad-free.
                    </li>
                    <li className="flex items-center text-lg gap-x-2">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
                        just for you.
                    </li>
                    <li className="flex items-center text-lg gap-x-2">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
                        your plan anytime.
                    </li>
                </ul>
                {/* Plan */}
                <div className="flex flex-col mt-4 space-y-4">
                    <div className="flex items-center self-end justify-end w-full md:w-3/5">
                        <div className="planBox"> standard</div>
                        <div className="planBox"> standard</div>
                        <div className="planBox"> standard</div>
                    </div>
                    <Table/>
                </div>
            </main>
        </div >
    )
}

export default Plans