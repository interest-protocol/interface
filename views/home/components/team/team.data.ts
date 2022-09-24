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
<<<<<<< HEAD
    role: 'landingPage.roleCEO',
=======
    role: 'Co-Founder & CEO',
>>>>>>> 0e0825b (🔥 feat: team section (#129))
    image: 'jose-cerqueira',
    social: {
      github: 'https://github.com/josemvcerqueira',
      linkedin: 'https://www.linkedin.com/in/josemvcerqueira/',
      twitter: 'https://twitter.com/josemvcerqueira',
    },
<<<<<<< HEAD
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
=======
    bio: `Previously at Banco EuroBIC. ${getYearOrMonth(
      {
        month: 1,
        year: 2017,
      },
      true
    )} of software development. ${getYearOrMonth(
      {
        month: 1,
        year: 2017,
      },
      true
    )} in the crypto industry. Responsible for the smart contract development of Interest Protocol.`,
  },
  {
    name: 'José P. Nelumba',
    role: 'Co-Founder & CFO',
>>>>>>> 0e0825b (🔥 feat: team section (#129))
    image: 'jose-nelumba',
    social: {
      linkedin:
        'https://www.linkedin.com/in/jos%C3%A9-pedro-cerqueira-nelumba/',
      twitter: 'https://twitter.com/Pedro102792',
    },
<<<<<<< HEAD
    bio: 'landingPage.bioNelumba',
    depsBio: {},
  },
  {
    name: 'Marco Pitra',
    role: 'landingPage.developer',
=======
    bio: `${getYearOrMonth(
      {
        month: 1,
        year: 2018,
      },
      true
    )} as a financial advisor for businesses. Crypto advocate since 2017.
    Co-founder of a medical emergency tech company that has saved over 1000 lives.
    Responsible for fundraising and managing the Interest Protocol finances.`,
  },
  {
    name: 'Marco Pitra',
    role: 'Developer',
>>>>>>> 0e0825b (🔥 feat: team section (#129))
    image: 'marco-pitra',
    social: {
      github: 'https://github.com/git-marcopitra',
      linkedin: 'https://www.linkedin.com/in/marco-pitra/',
      twitter: 'https://twitter.com/marcopitra',
    },
<<<<<<< HEAD
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
=======
    bio: `${getYearOrMonth(
      {
        month: 12,
        year: 2019,
      },
      true
    )} in web development. ${getYearOrMonth(
      { month: 7, year: 2021 },
      true
    )} in crypto. A React ninja working on Interest Protocol's interface.`,
  },
  {
    name: 'António Kipanda',
    role: 'Developer',
>>>>>>> 0e0825b (🔥 feat: team section (#129))
    image: 'antonio-cardoso',
    social: {
      github: 'https://github.com/KipandaJr',
      linkedin: 'https://www.linkedin.com/in/kipanda-cardoso/',
      twitter: 'https://twitter.com/kipaskipasJr',
    },
<<<<<<< HEAD
    bio: 'landingPage.bioKipanda',
    depsBio: {
      year1: getYearOrMonth({ month: 1, year: 2019 }, false),
    },
=======
    bio: `${getYearOrMonth(
      { month: 1, year: 2019 },
      true
    )} of software development. Working as a frontend developer at Interest Protocol.
    `,
>>>>>>> 0e0825b (🔥 feat: team section (#129))
  },
];
