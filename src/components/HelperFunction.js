export const DataToSelectOptions =(dataList, nameKey , idKey) => {
    return dataList?.map((item) => ({
        label: item[nameKey],
        value: item[idKey],
    }));
};