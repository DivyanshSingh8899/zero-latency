# ⚡ Zero Latency — Real-Time Mobile AI Debugging Co-Pilot

A hackathon prototype demonstrating how a developer's laptop and phone can work together to debug software errors in real time.

**Flow:** Desktop Error → Real-Time Mobile Alert → AI Analysis → Suggested Fix → One-Tap Patch Applied

## Demo

Open `index.html` in any browser — no build step, no backend, no API keys required. Everything (the terminal, error trace, AI analysis, and patch flow) is simulated with vanilla JavaScript.

### Try it
1. Click **🔴 Generate Error** on the Desktop IDE panel.
2. Watch the error stream to the phone in real time.
3. Tap **🧠 Analyze with AI** on the phone to see the simulated root-cause analysis and suggested fix.
4. Tap **🔧 APPLY PATCH** to send the fix back to the desktop and watch both sides update.
5. Tap **↻ Start New Debug Session** to reset and demo again.

## Stack

Single-file HTML/CSS/JS. No dependencies, no build tools — just open `index.html`.
