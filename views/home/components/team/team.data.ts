import { GithubSVG, LinkedinSVG, TwitterSVG } from '@/svg';
import { getYearOrMonth } from '@/utils/date/index';

export const SOCIAL_SVG = {
  github: GithubSVG,
  linkedin: LinkedinSVG,
  twitter: TwitterSVG,
};

export const TEAM_MEMBERS = [
  {
    name: 'José Cerqueira',
    role: 'Co-Founder & CEO',
    image: 'https://thispersondoesnotexist.com/image?v=10',
    social: {
      github: 'https://github.com/josemvcerqueira',
      linkedin: 'https://www.linkedin.com/in/josemvcerqueira/',
      twitter: 'https://twitter.com/josemvcerqueira',
    },
    bio: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Itaque aspernatur ducimus, vitae molestias libero quia quasi
    adipisci minima sunt odit voluptatibus quae, veniam maxime
    ex ipsum amet, natus optio illo.`,
  },
  {
    name: 'Pedro Nelumba',
    role: 'Co-Founder & CFO',
    image: 'https://thispersondoesnotexist.com/image?v=20',
    social: {
      github: 'https://github.com/josemvcerqueira',
      linkedin: 'https://www.linkedin.com/in/josemvcerqueira/',
      twitter: 'https://twitter.com/josemvcerqueira',
    },
    bio: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Itaque aspernatur ducimus, vitae molestias libero quia quasi
    adipisci minima sunt odit voluptatibus quae, veniam maxime
    ex ipsum amet, natus optio illo.`,
  },
  {
    name: 'Marco Pitra',
    role: 'Developer',
    image: 'https://thispersondoesnotexist.com/image?v=30',
    social: {
      github: 'https://github.com/git-marcopitra',
      linkedin: 'https://www.linkedin.com/in/marco-pitra/',
      twitter: 'https://twitter.com/marcopitra',
    },
    bio: `${getYearOrMonth(
      {
        month: 12,
        year: 2019,
      },
      true
    )} in development, ${getYearOrMonth(
      { month: 3, year: 2022 },
      true
    )} of them in the crypto industry. Working in Interest Protocol team and making product as good as it can be.`,
  },
  {
    name: 'António Kipanda',
    role: 'Developer',
    image: 'https://thispersondoesnotexist.com/image?v=40',
    social: {
      github: 'https://github.com/josemvcerqueira',
      linkedin: 'https://www.linkedin.com/in/josemvcerqueira/',
      twitter: 'https://twitter.com/josemvcerqueira',
    },
    bio: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Itaque aspernatur ducimus, vitae molestias libero quia quasi
    adipisci minima sunt odit voluptatibus quae, veniam maxime
    ex ipsum amet, natus optio illo.`,
  },
];
