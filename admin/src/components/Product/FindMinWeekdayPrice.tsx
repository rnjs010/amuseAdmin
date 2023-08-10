const FindMinWeekdayPrice = (ticket: any[]): number => {
    let minPrice = Infinity;

    for (const entry of ticket) {
        for (const priceEntry of entry.priceList) {
            const weekdayPrices = priceEntry.weekdayPrices;
            const weekdays = Object.keys(weekdayPrices);

            for (const weekday of weekdays) {
                const price = parseInt(weekdayPrices[weekday]);

                if (price < minPrice) {
                    minPrice = price;
                }
            }
        }
    }

    return minPrice;
}

export default FindMinWeekdayPrice