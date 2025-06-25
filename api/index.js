// Simple API endpoint for Vercel deployment
export default function handler(req, res) {
  res.status(200).json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
    message: "Portfolio API is running"
  });
}
