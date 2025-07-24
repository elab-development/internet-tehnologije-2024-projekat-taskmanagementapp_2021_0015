export const zadaci = [
    {
        id: "0",
        naziv: "Zavrsiti online kurs o vestackoj inteligenciji",
        opis: "Zavrsiti preostala 3 modula kursa na Courseri o osnovama AI.",
        rok: "2025-07-31",
        status: "U toku",
        prioritet: "Visok",
        kategorija: "0",
        korisnik: 0
    },
    {
        id: "1",
        naziv: "Pripremiti budzet za avgust",
        opis: "Napraviti tabelu sa ocekivanim prihodima i rashodima za naredni mesec.",
        rok: "2025-07-25",
        status: "Nije zapocet",
        prioritet: "Srednji",
        kategorija: "1",
        korisnik: 1
    },
    {
        id: "2",
        naziv: "Organizovati vikend putovanje",
        opis: "Istraziti destinacije, rezervisati prevoz i smestaj za vikend u avgustu.",
        rok: "2025-07-20",
        status: "U toku",
        prioritet: "Nizak",
        kategorija: "2",
        korisnik: 1
    },
    {
        id: "3",
        naziv: "Pripremiti prezentaciju za klijenta",
        opis: "Napraviti PowerPoint prezentaciju sa rezultatima projekta i planovima za sledecu fazu.",
        rok: "2025-07-18",
        status: "U toku",
        prioritet: "Visok",
        kategorija: "3",
        korisnik: 1
    },
    {
        id: "4",
        naziv: "Citanje knjige \"Deep Work\"",
        opis: "Procitati bar jedno poglavlje dnevno, zavrsiti knjigu do kraja meseca.",
        rok: "",
        status: "Nije zapocet",
        prioritet: "Srednji",
        kategorija: "0",
        korisnik: 0
    },
    {
        id: "5",
        naziv: "Obaviti tehnicki pregled automobila",
        opis: "Zakazati i odvesti auto na redovni godisnji tehnicki pregled.",
        rok: "2025-07-22",
        status: "Zavrsen",
        prioritet: "Srednji",
        kategorija: "4",
        korisnik: 0
    },
    {
        id: "6",
        naziv: "Zameniti osiguranje stana",
        opis: "Uporediti ponude i izabrati novu polisu stambenog osiguranja.",
        rok: "2025-07-28",
        status: "Nije zapocet",
        prioritet: "Visok",
        kategorija: "1",
        korisnik: 1
    },
    {
        id: "7",
        naziv: "Odrzati sastanak sa timom",
        opis: "Pripremiti dnevni red i organizovati nedeljni timski sastanak putem Zoom-a.",
        rok: "2025-08-20",
        status: "U toku",
        prioritet: "Srednji",
        kategorija: "3",
        korisnik: 1
    },
    {
        id: "8",
        naziv: "Azurirati LinkedIn profil",
        opis: "Dodati nove vestine, iskustva i projekte na LinkedIn nalog.",
        rok: "2025-07-19",
        status: "Nije zapocet",
        prioritet: "Nizak",
        kategorija: "5",
        korisnik: 0
    },
    {
        id: "9",
        naziv: "Isplanirati godisnji odmor",
        opis: "Izabrati datume, destinaciju i izraditi okvirni plan putovanja.",
        rok: "2025-08-05",
        status: "Nije zapocet",
        prioritet: "Srednji",
        kategorija: "2",
        korisnik: 0
    },
    {
        id: "10",
        naziv: "Napraviti plan ucenja za jesen",
        opis: "Definisati koje kurseve i knjige planiram da obradim tokom jeseni",
        rok: "2025-08-15",
        status: "Nije zapoceto",
        prioritet: "Srednji",
        kategorija: "0",
        korisnik: 1
    }
]

export const kategorije = [
    {
        id: "0",
        naziv: "Licni razvoj",
        tag: "lr"
    },
    {
        id: "1",
        naziv: "Finansije",
        tag: "fin"
    },
    {
        id: "2",
        naziv: "Putovanja",
        tag: "trav"
    },
    {
        id: "3",
        naziv: "Projekat",
        tag: "proj"
    },
    {
        id: "4",
        naziv: "Odrzavanje",
        tag: "maint"
    },
    {
        id: "5",
        naziv: "Karijera",
        tag: "career"
    }
]

export const liste = [
    {
        id: "0",
        naziv: "Licni razvoj",
        korisnik: 0
    },
    {
        id: "1",
        naziv: "Radni zadaci",
        korisnik: 1
    }
]

export const redosled = [
    //Licni razvoj
    {listaId: "0", zadatakId: "0", rb: 1},
    {listaId: "0", zadatakId: "4", rb: 2},

    //Radni zadaci
    {listaId: "1", zadatakId: "3", rb: 1},
    {listaId: "1", zadatakId: "7", rb: 2},
]

export const korisnici = [
    {
        id:0,
        ime: "Pera",
        prezime: "Peric",
        username: "perap01",
        password: "123456"
    },
    {
        id:1,
        ime: "Ana",
        prezime: "Marinkovic",
        username: "marinkovica97",
        password: "123456"
    }
]