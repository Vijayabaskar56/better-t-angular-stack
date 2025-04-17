import fp from 'fastify-plugin';
import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler';

/**
 * This plugins enables the use of scheduling.
 *
 * @see {@link https://github.com/fastify/fastify-schedule}
 */
export default fp(async (fastify) => {

 fastify.ready(() => {
  // Define your task
  const task = new AsyncTask(
   'simple task',
   () => {
    // Replace this with your actual task logic
    console.log('Running task...');
    return Promise.resolve();
   },
   (err) => {
    console.error('Task error:', err);
   }
  );

  // Define your job
  const job = new SimpleIntervalJob({ seconds: 20 }, task);

  // Add the job to the scheduler
  fastify.scheduler.addSimpleIntervalJob(job);
 });
});
