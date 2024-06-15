"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { ArrowsCounterClockwise } from "@phosphor-icons/react";
import { Button, Input, Select } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { supportedCurrencies } from "@/data/countries/currencyData";

dayjs.extend(relativeTime);

export default function CurrencyComponent() {
    const [currencyOne, setCurrencyOne] = useState("USD");
    const [currencyTwo, setCurrencyTwo] = useState("GBP");
    const [currencyRate, setCurrencyRate] = useState(0);
    const [inputAmount, setInputAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    useEffect(() => {
        const controller = new AbortController();

        const getCurrencyRate = async () => {
            try {
                const response = await axios.get(
                    `/api/get-currency-rate?currencyOne=${currencyOne}&currencyTwo=${currencyTwo}`,
                );

                const data = response.data;
                const currency = Object.values(data.data as string);
                if (currency?.length > 0) {
                    setCurrencyRate(Number(currency[0]));
                }
            } catch (error) {
                console.log(error);
            }
        };

        void getCurrencyRate();

        return () => {
            controller.abort();
        };
    }, [currencyOne, currencyTwo]);

    useEffect(() => {
        const calculateTotalAmount = () => {
            setTotalAmount(Number((inputAmount * currencyRate).toFixed(2)));
            setLastUpdated(new Date());
        };
        calculateTotalAmount();
    }, [inputAmount, currencyRate]);

    const currencies = Object.values(supportedCurrencies).map(
        (currency) => currency,
    );

    const isSameCurrency = currencyOne === currencyTwo;

    const onChangeForCurrencyOne = async (value: string) => {
        setCurrencyOne(value);
    };

    const onSearchForCurrencyOne = (value: string) => {
        setCurrencyOne(value);
    };

    const onChangeForCurrencyTwo = async (value: string) => {
        setCurrencyTwo(value);
    };

    const onSearchForCurrencyTwo = (value: string) => {
        setCurrencyTwo(value);
    };

    const handleSwapCurrencies = () => {
        setCurrencyOne(currencyTwo);
        setCurrencyTwo(currencyOne);
    };

    return (
        <div className="flex h-dvh items-center justify-center sm:w-96">
            <Card className="w-80 sm:w-full">
                <CardHeader>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 p-1 sm:h-28 sm:w-28">
                        <Image
                            src="/images/logos/exchango-logo.webp"
                            alt="Money"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                    </div>
                    <CardTitle>Exchango</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        This Currency Converter tool helps you convert money
                        from one currency to another based on the latest
                        exchange rates.
                    </CardDescription>
                    <div className="-px-1 flex w-full flex-col py-2">
                        <label
                            htmlFor="currency-one"
                            className="text-sm text-gray-500"
                        >
                            Base Currency:
                        </label>
                        <Select
                            id="currency-one"
                            className="] mb-1 mr-2 w-64 bg-[#FCFCFB] sm:w-full"
                            showSearch
                            placeholder="Select a currency"
                            defaultValue="USD"
                            onChange={onChangeForCurrencyOne}
                            onSearch={onSearchForCurrencyOne}
                            value={currencyOne}
                        >
                            {currencies.map((currency) => (
                                <Select.Option
                                    key={currency.code}
                                    value={currency.code}
                                >
                                    <div className="flex items-center">
                                        <p className="mx-1">{currency.flag}</p>
                                        <p className="mx-1">{currency.name}</p>
                                        <p className="mx-1">
                                            {" "}
                                            ({currency.code})
                                        </p>
                                    </div>
                                </Select.Option>
                            ))}
                        </Select>
                        <label
                            htmlFor="currency-two"
                            className="text-sm text-gray-500"
                        >
                            Target Currency:
                        </label>
                        <Select
                            id="currency-two"
                            className="mt-1 w-64 sm:w-full"
                            showSearch
                            placeholder="Select a currency"
                            defaultValue="GBP"
                            onChange={onChangeForCurrencyTwo}
                            onSearch={onSearchForCurrencyTwo}
                            value={currencyTwo}
                        >
                            {currencies.map((currency) => (
                                <Select.Option
                                    key={currency.code}
                                    value={currency.code}
                                >
                                    <div className="flex items-center text-ellipsis">
                                        <p className="mx-1">{currency.flag}</p>
                                        <p className="mx-1">{currency.name}</p>
                                        <p className="mx-1">
                                            {" "}
                                            ({currency.code})
                                        </p>
                                    </div>
                                </Select.Option>
                            ))}
                        </Select>

                        <div className="mt-3 flex w-64 justify-center sm:w-full">
                            <Button
                                className="flex items-center justify-center p-5 text-center"
                                color="bg-[#FCFCFB] "
                                type="dashed"
                                onClick={handleSwapCurrencies}
                            >
                                <ArrowsCounterClockwise size={27} />
                            </Button>
                        </div>

                        {!isSameCurrency ? (
                            <div className="mt-3 flex flex-col">
                                <label
                                    htmlFor="currencyAmount"
                                    className="mb-1 text-sm text-gray-500"
                                >
                                    Amount
                                </label>

                                <Input
                                    id="amount"
                                    data-testid="amount"
                                    className="sm:w-full"
                                    type="number"
                                    placeholder="Enter amount"
                                    value={inputAmount}
                                    count={{
                                        max: 9,
                                    }}
                                    onChange={(e) =>
                                        setInputAmount(Number(e.target.value))
                                    }
                                />
                            </div>
                        ) : (
                            <p className="mt-3 text-center text-sm text-red-500">
                                Please select different currencies
                            </p>
                        )}
                    </div>
                    <div>
                        {inputAmount != 0 && !isSameCurrency && (
                            <Alert>
                                <AlertDescription>
                                    {inputAmount} {currencyOne} equals
                                </AlertDescription>
                                <AlertTitle className="text-3xl">
                                    {totalAmount}
                                    <span> </span>
                                    {currencyTwo}
                                </AlertTitle>
                            </Alert>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                    <CardDescription className="text-xs text-gray-500">
                        Last updated: {dayjs(lastUpdated).fromNow()}
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
}
