"use server";

import { NextResponse } from "next/server";

import axios from "axios";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const API_URL = process.env.API_URL;

        console.log("API_URL", API_URL);

        if (API_URL === undefined) {
            return NextResponse.json(
                { error: "API_URL is not defined" },
                { status: 500 },
            );
        }

        const currencyOne = searchParams.get("currencyOne");
        const currencyTwo = searchParams.get("currencyTwo");

        if (!currencyOne || !currencyTwo) {
            return NextResponse.json(
                { error: "CurrencyOne and CurrencyTwo are required" },
                { status: 400 },
            );
        }

        const TARTGETED_URL = `${API_URL}&base_currency=${currencyOne}&currencies=${currencyTwo}`;

        console.log("TARTGETED_URL", TARTGETED_URL);

        const response = await axios.get(TARTGETED_URL);

        if (response.status !== 200) {
            return NextResponse.json(
                { error: "Error, Something went wrong! Try again Later" },
                { status: 400 },
            );
        }

        const { data } = response;

        if (data.status === "error") {
            return NextResponse.json(data.message as string, { status: 400 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error, Something went wrong! Try again Later" },
            { status: 400 },
        );
    }
}

// API Route call URL is : http://localhost:3000/api/get-currency-rate?currencyOne=<currencyOne>&currencyTwo=<currencyTwo>
