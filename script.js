const revealItems = document.querySelectorAll(".reveal");
const animatedTracks = document.querySelectorAll(".cert-track");
const caseStudies = [
  {
    title: "MongoDB Atlas Platform Automation",
    domain: "Data Platform",
    stack: "Terraform • MongoDB Atlas • Secret Manager",
    summary:
      "Standardized Atlas provisioning, bootstrap automation, role modeling, and downstream service handoff.",
    problem:
      "Provisioned databases were still leaving teams with manual setup around users, roles, connection strings, and post-provision configuration.",
    approach:
      "Built a reusable Terraform module plus bootstrap and secret-mapping flow that connected infrastructure outputs directly to application consumption.",
    outcome:
      "Reduced manual translation after provisioning and made MongoDB environments more consistent, secure, and easier for downstream teams to use.",
  },
  {
    title: "Cloud Armor WAF Tuning",
    domain: "Security",
    stack: "GCP • Cloud Armor • Load Balancing",
    summary:
      "Protected public workloads while tuning WAF behavior for real authentication and redirect traffic.",
    problem:
      "Managed WAF rules were catching legitimate cookies, redirect parameters, and callback flows, creating friction for product usage.",
    approach:
      "Analyzed real request behavior, narrowed exclusions precisely, and preserved enforcement while removing noisy false positives.",
    outcome:
      "Improved edge security posture without breaking legitimate traffic patterns relied on by portal and auth-related flows.",
  },
  {
    title: "Private-by-Default Cloud Run Design",
    domain: "Platform Networking",
    stack: "Cloud Run • VPC • NAT • IAM",
    summary:
      "Moved services toward internal-only access and more deliberate network paths on GCP.",
    problem:
      "Public-by-default service exposure and loosely defined traffic paths created unnecessary security and architecture complexity.",
    approach:
      "Worked through internal-only ingress, Direct VPC egress, tighter invoker models, and cleaner internal communication patterns.",
    outcome:
      "Strengthened service boundaries and created a clearer foundation for secure runtime communication across the platform.",
  },
  {
    title: "Developer Platform for Multi-Service Local Setup",
    domain: "Developer Experience",
    stack: "Docker Compose • 1Password • MongoDB • Cloudflare",
    summary:
      "Built a local engineering environment for multiple services with repeatable secrets and seed workflows.",
    problem:
      "Multi-service local setup carried too much tribal knowledge and too much configuration friction for day-to-day engineering work.",
    approach:
      "Standardized local startup, secret sync, health checks, Atlas/local modes, and Mongo seed commands into a more usable internal platform.",
    outcome:
      "Improved onboarding and debugging flow by making local setup more repeatable and less dependent on manual operator knowledge.",
  },
  {
    title: "GCP Artifact Registry with Federated CI/CD Identity",
    domain: "Cloud Identity",
    stack: "GCP • GitHub OIDC • Workload Identity Federation • IAM",
    summary:
      "Built a safer cloud delivery model without depending on long-lived static credentials in CI/CD.",
    problem:
      "Delivery workflows can become brittle and risky when cloud access is managed through static secrets and over-permissioned identities.",
    approach:
      "Defined service accounts, IAM bindings, and workload identity federation in Terraform so GitHub workflows could authenticate through OIDC.",
    outcome:
      "Improved credential hygiene, reduced secret sprawl, and created a clearer and more auditable access model for delivery pipelines.",
  },
  {
    title: "Session Affinity for GKE-exposed Services",
    domain: "Runtime Reliability",
    stack: "GKE • BackendConfig • Load Balancing",
    summary:
      "Addressed user-facing instability caused by traffic distribution rather than application code defects.",
    problem:
      "Session-sensitive services and long-lived interactions were being disrupted by load-balancer behavior and pod shuffling.",
    approach:
      "Introduced backend session-affinity patterns and aligned service exposure behavior with the runtime expectations of the affected applications.",
    outcome:
      "Improved stability for stateful user flows and reduced issues that looked application-side but actually originated in the platform layer.",
  },
  {
    title: "Multi-environment Bring-up and Platform Standardization",
    domain: "Platform Delivery",
    stack: "Terraform • GitOps • GKE • Cloud Networking",
    summary:
      "Supported repeatable environment rollout through stronger structure, validation, and promotion-safe platform patterns.",
    problem:
      "New or evolving environments can accumulate hidden assumptions, inconsistent structure, and unclear rollout sequencing.",
    approach:
      "Used modular Terraform, environment workspaces, explicit checklists, and GitOps-managed manifests to make bring-up flows more consistent.",
    outcome:
      "Improved environment clarity and reduced the operational friction of scaling platform patterns across dev, staging, and newer environments.",
  },
];

const caseTitle = document.getElementById("case-study-title");
const caseDomain = document.getElementById("case-study-domain");
const caseStack = document.getElementById("case-study-stack");
const caseSummary = document.getElementById("case-study-summary");
const caseProblem = document.getElementById("case-study-problem");
const caseApproach = document.getElementById("case-study-approach");
const caseOutcome = document.getElementById("case-study-outcome");
const casePrev = document.getElementById("case-prev");
const caseNext = document.getElementById("case-next");
const caseDots = document.getElementById("case-dots");
let activeCaseIndex = 0;

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -48px 0px",
  }
);

for (const item of revealItems) {
  revealObserver.observe(item);
}

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a")];

const syncActiveLink = () => {
  const offset = window.scrollY + 140;
  let current = sections[0]?.id;

  for (const section of sections) {
    if (offset >= section.offsetTop) {
      current = section.id;
    }
  }

  for (const link of navLinks) {
    const target = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("is-active", target === current);
  }
};

const heroFrame = document.querySelector(".hero-frame");

const parallaxHero = (event) => {
  if (!heroFrame || window.innerWidth < 821) {
    return;
  }

  const { innerWidth, innerHeight } = window;
  const x = (event.clientX / innerWidth - 0.5) * 10;
  const y = (event.clientY / innerHeight - 0.5) * 10;

  heroFrame.style.transform = `perspective(1200px) rotateX(${-y * 0.25}deg) rotateY(${x * 0.25}deg)`;
};

const resetHero = () => {
  if (heroFrame) {
    heroFrame.style.transform = "";
  }
};

for (const track of animatedTracks) {
  track.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });

  track.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
}

const renderCaseStudy = (index) => {
  const item = caseStudies[index];
  if (!item) {
    return;
  }

  caseTitle.textContent = item.title;
  caseDomain.textContent = item.domain;
  caseStack.textContent = item.stack;
  caseSummary.textContent = item.summary;
  caseProblem.textContent = item.problem;
  caseApproach.textContent = item.approach;
  caseOutcome.textContent = item.outcome;

  const dots = [...caseDots.querySelectorAll(".carousel-dot")];
  for (const [dotIndex, dot] of dots.entries()) {
    dot.classList.toggle("is-active", dotIndex === index);
  }
};

for (const [index] of caseStudies.entries()) {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "carousel-dot";
  dot.setAttribute("aria-label", `Go to case study ${index + 1}`);
  dot.addEventListener("click", () => {
    activeCaseIndex = index;
    renderCaseStudy(activeCaseIndex);
  });
  caseDots.appendChild(dot);
}

casePrev?.addEventListener("click", () => {
  activeCaseIndex = (activeCaseIndex - 1 + caseStudies.length) % caseStudies.length;
  renderCaseStudy(activeCaseIndex);
});

caseNext?.addEventListener("click", () => {
  activeCaseIndex = (activeCaseIndex + 1) % caseStudies.length;
  renderCaseStudy(activeCaseIndex);
});

renderCaseStudy(activeCaseIndex);

window.addEventListener("mousemove", parallaxHero, { passive: true });
window.addEventListener("mouseleave", resetHero);
window.addEventListener("scroll", syncActiveLink, { passive: true });
window.addEventListener("load", syncActiveLink);
