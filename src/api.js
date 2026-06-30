export async function generatePlan(task, deadline, priority) {

  return new Promise((resolve) => {

    setTimeout(() => {

      const complexity = task.length > 20 ? "high" : "medium";

      const focusTime = priority === "high" ? 45 : 30;

      resolve(`

📌 TASK: ${task}

🧠 ANALYSIS:
This is a ${complexity} complexity task.

⏱ PLAN:
- Break task into small steps
- Work in ${focusTime}-minute focused sessions
- Review before submission

⚡ PRIORITY: ${priority}

📅 DEADLINE: ${deadline}

🚨 STRATEGY:
Start immediately. Avoid multitasking.

💡 TIP:
Finish the hardest part first, not the easiest.

      `);

    }, 1200);

  });
}
