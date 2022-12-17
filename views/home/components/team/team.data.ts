import { DiscordSVG, GithubSVG, LinkedInSVG, TwitterSVG } from '@/svg';
import { getYearOrMonth } from '@/utils';

export const SOCIAL_SVG = {
  github: GithubSVG,
  linkedin: LinkedInSVG,
  twitter: TwitterSVG,
  discord: DiscordSVG,
};

export const TEAM_MEMBERS = [
  {
    name: 'José Cerqueira',
    role: 'landingPage.roleCEO',
    image: 'jose-cerqueira',
    social: {
      github: 'https://github.com/josemvcerqueira',
      linkedin: 'https://www.linkedin.com/in/josemvcerqueira/',
      twitter: 'https://twitter.com/josemvcerqueira',
    },
    bio: 'landingPage.bioCerqueira',
    depsBio: {
      year1: getYearOrMonth(
        {
          month: 1,
          year: 2017,
        },
        false
      ),
      year2: getYearOrMonth(
        {
          month: 1,
          year: 2017,
        },
        false
      ),
    },
  },
  {
    name: 'José P. Nelumba',
    role: 'landingPage.roleCFO',
    image: 'jose-nelumba',
    social: {
      linkedin:
        'https://www.linkedin.com/in/jos%C3%A9-pedro-cerqueira-nelumba/',
      twitter: 'https://twitter.com/Pedro102792',
    },
    bio: 'landingPage.bioNelumba',
    depsBio: {},
  },
  {
    name: 'Marco Pitra',
    role: 'landingPage.developer',
    image: 'marco-pitra',
    social: {
      github: 'https://github.com/git-marcopitra',
      linkedin: 'https://www.linkedin.com/in/marco-pitra/',
      twitter: 'https://twitter.com/marcopitra',
    },
    bio: 'landingPage.bioPitra',
    depsBio: {
      year1: getYearOrMonth(
        {
          month: 12,
          year: 2019,
        },
        false
      ),
      year2: getYearOrMonth(
        {
          month: 7,
          year: 2021,
        },
        false
      ),
    },
  },
  {
    name: 'António Kipanda',
    role: 'landingPage.developer',
    image: 'antonio-cardoso',
    social: {
      github: 'https://github.com/KipandaJr',
      linkedin: 'https://www.linkedin.com/in/kipanda-cardoso/',
      twitter: 'https://twitter.com/kipaskipasJr',
    },
    bio: 'landingPage.bioKipanda',
    depsBio: {
      year1: getYearOrMonth({ month: 1, year: 2019 }, false),
    },
  },
  {
    name: 'Nilam Jaiswal',
    role: 'landingPage.marketingManager',
    image: 'nilam-jaiswal',
    social: {
      discord: 'http://discordapp.com/users/851547717163024437',
      linkedin: 'https://www.linkedin.com/in/nilam-jjaiswal/',
      twitter: 'https://twitter.com/crypto_wife1',
    },
    bio: 'landingPage.bioNilam',
    depsBio: {
      year1: getYearOrMonth({ month: 1, year: 2017 }, false),
    },
  },
];
