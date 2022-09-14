import { GithubSVG, LinkedInSVG, TwitterSVG } from '@/svg';
import { getYearOrMonth } from '@/utils';

export const SOCIAL_SVG = {
  github: GithubSVG,
  linkedin: LinkedInSVG,
  twitter: TwitterSVG,
};

export const TEAM_MEMBERS = [
  {
    name: 'José Cerqueira',
    role: 'common.roleCEO',
    image: 'jose-cerqueira',
    social: {
      github: 'https://github.com/josemvcerqueira',
      linkedin: 'https://www.linkedin.com/in/josemvcerqueira/',
      twitter: 'https://twitter.com/josemvcerqueira',
    },
    bio: 'index.bioCerqueira',
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
    role: 'common.roleCFO',
    image: 'jose-nelumba',
    social: {
      linkedin:
        'https://www.linkedin.com/in/jos%C3%A9-pedro-cerqueira-nelumba/',
      twitter: 'https://twitter.com/Pedro102792',
    },
    bio: 'index.bioNelumba',
    depsBio: {
      year1: getYearOrMonth(
        {
          month: 1,
          year: 2018,
        },
        false
      ),
    },
  },
  {
    name: 'Marco Pitra',
    role: 'common.developer',
    image: 'marco-pitra',
    social: {
      github: 'https://github.com/git-marcopitra',
      linkedin: 'https://www.linkedin.com/in/marco-pitra/',
      twitter: 'https://twitter.com/marcopitra',
    },
    bio: 'index.bioPitra',
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
    role: 'common.developer',
    image: 'antonio-cardoso',
    social: {
      github: 'https://github.com/KipandaJr',
      linkedin: 'https://www.linkedin.com/in/kipanda-cardoso/',
      twitter: 'https://twitter.com/kipaskipasJr',
    },
    bio: 'index.bioKipanda',
    depsBio: {
      year1: getYearOrMonth({ month: 1, year: 2019 }, false),
    },
  },
];
