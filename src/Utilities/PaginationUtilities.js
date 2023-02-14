import config from '../constant'


export const getTotalPages = (length) => {
    return Math.ceil(length / 12);
}


export const getRecordIndex = (page) => {
    return (page - 1) * config.PAGE_SIZE;
}


