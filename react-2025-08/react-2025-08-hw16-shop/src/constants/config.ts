export const COMMAND_ID = '90918bc1-2533-4917-8ea2-0398e6ad6d80';

export const getApiUrl = () => {
    const proto = window.location.protocol.startsWith('https') ? 'https://' : 'http://';
    return proto + '19429ba06ff2.vps.myjino.ru/api';
};
