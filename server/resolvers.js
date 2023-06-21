import { getJobs } from "./db/jobs.js";

export const resolvers = {
  Query: {
    jobs: async () => {
      const jobs = await getJobs();
      console.log(jobs);
      return jobs;
        // return [
        //   {
        //     id: "test-id",
        //     title: "The Title",
        //     description: "The description",
        //     extraprop: 'whatever'
        //   },
        //   {
        //     id: "test-id-2",
        //     title: "The Title 2",
        //     description: "The description",
        //   },
        // ];
    },
  },
};
