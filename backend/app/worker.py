import uuid
import threading


class Worker:
    def __init__(self):
        self.jobs = {}


    def submit(self, fn, *args, **kwargs):
        job_id = str(uuid.uuid4())

        self.jobs[job_id] = {
            "status": "running",
            "result": None
        }

        def runner():
            try:
                result = fn(*args, **kwargs)
                self.jobs[job_id]["status"] = "done"
                self.jobs[job_id]["result"] = result

            except Exception as e:
                self.jobs[job_id]["status"] = "error"
                self.jobs[job_id]["result"] = str(e)

        thread = threading.Thread(target=runner)
        thread.start()

        return job_id


    def get(self, job_id):
        return self.jobs.get(job_id)


# Singleton
WORKER = Worker()
