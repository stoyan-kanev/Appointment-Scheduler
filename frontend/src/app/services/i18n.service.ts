import {Injectable} from '@angular/core';

type Language = 'en' | 'bg';

const translations: Record<Language, Record<string, string>> = {
    en: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        team: 'Team',
        welcome: 'Let us elevate your look.',
        bookNow: 'Book Now',
        servedByPros: 'You are served by professional barbers.',
        wellGroomedText:
            'The desired man is the well-groomed man. Trust our team of expert barbers to craft and refine your modern look. Enjoy some manly time for yourself — and we\'ll make sure you leave with a smile and come back again.',
        ourTeam: 'Our Work',
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
        aboutTitle: 'About Elite Barber Demo',
        aboutIntro: 'Welcome to our barbershop, crafted with the modern gentleman in mind. Enjoy high-class experience, great vibes and a delicious cup of coffee. Find us in the heart of Plovdiv, Youth Hill area. We also offer a selection of premium grooming products to keep your hair and beard looking sharp between visits!',
        keyFeatures: 'Key Features',
        featureDate: 'Select a preferred date',
        featureSlots: 'View available time slots',
        featureInstant: 'Instantly book an appointment',
        poweredBy: 'Powered by Django & Angular — for blazing fast, real-time performance.',
        contactUs: 'Contact Us',
        address: 'Address',
        phoneLabel: 'Phone',
        email: 'Email',
        website: 'Website',
        followUs: 'Follow Us',
        chooseBarber: 'Choose Barber',
        chooseService: 'Choose Service',
        serviceTypes: 'Service Types',
        availableTimes: 'Available Times',
        reserveNow: 'RESERVE NOW',
        at: 'at',
        firstName: 'First Name...',
        lastName: 'Last Name...',
        email2: 'Email...',
        phone2: 'Phone...',
        cancel: 'Cancel',
        reserve: 'Reserve',
        maleHaircut: 'Male Haircut',
        beardShaping: 'Beard Shaping',
        combo: 'Combo(Hair + Beard)',
        fatherAndSon: 'Father and Son',
        beardDyeing: 'Beard + Dyeing',
        hairCamouflage: 'Hair Camouflage',
        headShave: 'Head Shave',
        headShaveBeard: 'Head Shave + Beard',
        clipperHaircut: 'Clipper Haircut (One Guard)',
    },
    bg: {
        home: 'Начало',
        about: 'За нас',
        services: 'Услуги',
        team: 'Екип',
        welcome: 'Заповядайте да се погрижим за вашата визия',
        bookNow: 'Резервирай час',
        servedByPros: 'Обслужват Ви професионални бръснари.',
        wellGroomedText:
            'Желаният мъж е добре поддържаният мъж. Доверете се на нашия екип от експерти, за да създаде и усъвършенства Вашия модерен вид. Насладете се на мъжко време за себе си — ще Ви накараме да се усмихнете и да се върнете отново.',
        ourTeam: 'Нашата работа',
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
        aboutTitle: 'За Elite Barber Demo',
        aboutIntro: 'е модерна платформа за резервации в барбершоп, показваща как трябва да работят съвременните срещи — гладко, стилно и интелигентно.',
        keyFeatures: 'Основни функционалности',
        featureDate: 'Избор на предпочитана дата',
        featureSlots: 'Преглед на свободни часове',
        featureInstant: 'Моментална резервация',
        poweredBy: 'Изградено с Django & Angular — за бърза, реална производителност.',
        contactUs: 'Свържи се с нас',
        address: 'Адрес',
        phoneLabel: 'Телефон',
        email: 'Имейл',
        website: 'Уебсайт',
        followUs: 'Последвай ни',
        chooseBarber: 'Избери бръснар',
        chooseService: 'Избери услуга',
        serviceTypes: 'Тип услуги',
        availableTimes: 'Свободни часове',
        reserveNow: 'РЕЗЕРВИРАЙ СЕГА',
        at: 'от',
        firstName: 'Име...',
        lastName: 'Фамилия...',
        email2: 'Имейл адрес...',
        phone2: 'Телефон...',
        cancel: 'Отказ',
        reserve: 'Резервирай',
        maleHaircut: 'Мъжко подстригване',
        beardShaping: 'Оформяне на брада',
        combo: 'Комбо(Коса и брада)',
        fatherAndSon: 'Баща и син',
        beardDyeing: 'Брада + боядисване',
        hairCamouflage: 'Камуфлиране на коса',
        headShave: 'Бръснене на глава',
        headShaveBeard: 'Бръснене на глава + брада',
        clipperHaircut: 'Подстригване с машинка (1 номер)',

    }
};

@Injectable({providedIn: 'root'})
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
