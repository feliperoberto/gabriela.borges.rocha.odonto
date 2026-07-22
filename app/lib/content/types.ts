export interface Procedure {
  slug: string;
  nome: string;
  desc: string;
}

export interface Location {
  slug: string;
  bairro: string;
  cidade: string;
  foto: string;
  alt: string;
}

export interface Testimonial {
  texto: string;
  autor: string;
}

export interface Insurance {
  nome: string;
  logo: string;
  alt: string;
}

export interface Profile {
  nome: string;
  cro: string;
  tel: string;
  telDisplay: string;
  email: string;
  instagram: string;
  cities: string[];
  whatsapp: {
    phone: string;
    defaultMessage: string;
  };
}
