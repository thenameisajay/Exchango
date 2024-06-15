import { supportedCurrencies } from "@/data/countries/currencyData";

export async function getCountryValidation(
    countryCode: string,
): Promise<boolean> {
    const currencies = Object.values(supportedCurrencies);

    console.log("currencies", currencies);

    const foundCurrency = currencies.find((currency) => {
        if (currency.code === countryCode) {
            console.log("currency code", currency.code);
            return true;
        }
        return false;
    });

    return !!foundCurrency;
}
