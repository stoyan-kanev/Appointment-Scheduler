import { Injectable } from '@angular/core';

type Language = 'en' | 'bg';

const translations: Record<Language, Record<string, string>> = {
    en: {
        home: 'Home',
        about: 'About',
        welcome: 'Welcome to our barber shop',
        bookNow: 'Book Now',
        servedByPros: 'You are served by professional barbers.',
        wellGroomedText:
            'The desired man is the well-groomed man. Trust our team of expert barbers to craft and refine your modern look. Enjoy some manly time for yourself — and we\'ll make sure you leave with a smile and come back again.',
        ourTeam: 'Our Team',
        openingHours: 'Opening Hours',
        monFri: 'Monday-Friday: 9am-7pm',
        saturday: 'Saturday: 9am-5pm',
        sunday: 'Sunday: Closed',
        socialMedia: 'Social Media',
        phone: 'Phone: +359858648296',
        location: 'Location',
        plovdivCenter: 'Plovdiv Center',
        addressLine: 'boulevard "Iztochen" 4',
        cityCountry: 'Plovdiv, Bulgaria',
    },
    bg: {
        home: 'Начало',
        about: 'За нас',
        welcome: 'Добре дошли в нашия бръснарски салон',
        bookNow: 'Резервирай час',
        servedByPros: 'Обслужват Ви професионални бръснари.',
        wellGroomedText:
            'Желаният мъж е добре поддържаният мъж. Доверете се на нашия екип от експерти, за да създаде и усъвършенства Вашия модерен вид. Насладете се на мъжко време за себе си — ще Ви накараме да се усмихнете и да се върнете отново.',
        ourTeam: 'Нашият екип',
        openingHours: 'Работно време',
        monFri: 'Понеделник-Петък: 9:00-19:00',
        saturday: 'Събота: 9:00-17:00',
        sunday: 'Неделя: Почивен ден',
        socialMedia: 'Социални мрежи',
        phone: 'Тел.: +359858648296',
        location: 'Локация',
        plovdivCenter: 'Център Пловдив',
        addressLine: 'булевард "Източен" 4',
        cityCountry: 'Пловдив, България',

    }
};

@Injectable({ providedIn: 'root' })
export class I18nService {
    private lang: Language = 'en';

    setLang(lang: Language) {
        this.lang = lang;
    }

    t(key: string): string {
        return translations[this.lang][key] || key;
    }

    get currentLang(): string {
        return this.lang;
    }
}
