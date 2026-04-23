const ipRequest = {};

// set to added the block ips
const blockIps = new Set();

// map  {"127.0.0.1" --> {time , count}}
const unBlockerTimers = new Map();

const RATE_LIMIT = 5;

const WINDOW_MS = 60 * 1000; //1min

export const customRateLimiter = (req, res, next) => {
  const ip = req.ip;

  const currentTime = Date.now();

  // check if ip is blocked
  if (blockIps.has(ip)) {
    return res
      .status(403)
      .json({ message: "this ip is Blocked, Try again later" });
  }

  if (!ipRequest[ip]) {
    // new ip
    ipRequest[ip] = {
      count: 1,
      startTime: currentTime,
    };
    return next();
  }

  // diffrent time between the first req of this ip and the new req
  const diff = currentTime - ipRequest[ip].startTime;

  if (diff < WINDOW_MS) {
    ipRequest[ip].count++;
    console.log(ipRequest[ip].count);

    if (ipRequest[ip].count > RATE_LIMIT) {
      blockIps.add(ip);

      if (!unBlockerTimers.has(ip)) {
        const timer = setTimeout(() => {
          blockIps.delete(ip);
          unBlockerTimers.delete(ip);
        }, WINDOW_MS);
        unBlockerTimers.set(ip, timer);
      }

      return res
        .status(429)
        .json({ message: "Too Many requests, you are Blocked" });
    }
  } else {
    ipRequest[ip] = {
      count: 1,
      startTime: currentTime,
    };
  }
  next();
};
