import React from "react";

import { getLocalisedYear } from "@/utils/helpers/getLocalisedYear";

const githubLink = "https://github.com/thenameisajay";

export default function Footer() {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <footer className="relative bottom-0 mx-4 my-4 w-64 rounded-full border border-slate-500 p-3 text-center text-black hover:bg-slate-100 focus:bg-slate-100 sm:p-2">
                <p className="text-xs">
                    <span className="text-base">&copy;</span>{" "}
                    <span className="font-semibold">
                        {" "}
                        {getLocalisedYear(new Date())}
                    </span>
                    ,{" "}
                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                    >
                        Made with 🧡 by AJ .
                    </a>
                </p>
            </footer>
        </div>
    );
}
