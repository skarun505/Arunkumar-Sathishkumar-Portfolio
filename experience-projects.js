/**
 * Experience Timeline & Projects Builder
 * Dynamically creates sticky scroll experience section and horizontal projects
 */

document.addEventListener('DOMContentLoaded', () => {
    buildExperienceTimeline();
    buildProjectsSection();
});

// ============================================
// BUILD EXPERIENCE TIMELINE
// ============================================
function buildExperienceTimeline() {
    const container = document.getElementById('experience-timeline');
    if (!container) return;

    const experiences = [
        {
            icon: '🏢',
            company: 'Triomentor Edu Services Private Limited',
            title: 'Digital Marketing Executive',
            type: 'Full-time | On-site',
            location: '📍 Bengaluru, Karnataka, India',
            date: '🗓 Jun 2025 – Present',
            details: `
                <p style="margin-bottom: 20px; font-style: italic;">At Triomentor, I handle digital marketing execution for multiple education-focused brands, working closely with founders, academic teams, and sales.</p>
                
                <h4>Key Accounts & Responsibilities:</h4>
                
                <h5>🔹 The Digi Code (MarTech Company)</h5>
                <ul>
                    <li>Managing end-to-end operations including client onboarding, campaign planning, execution, and reporting</li>
                    <li>Handling performance marketing, lead generation, and funnel optimization</li>
                    <li>Coordinating client requirements and translating them into actionable marketing strategies</li>
                    <li>Involved in SaaS product demos, demonstrations, and customer walkthroughs</li>
                    <li>Built mini SaaS tools and internal websites using Cursor, Tray, and Google Antigravity</li>
                    <li>Supporting product positioning and go-to-market execution</li>
                </ul>
                
                <h5>🔹 Bansal Classes (JEE & NEET Coaching Institute)</h5>
                <ul>
                    <li>Managing complete digital marketing operations</li>
                    <li>Planning and executing student lead generation campaigns</li>
                    <li>Handling Google Ads, Meta Ads, and performance optimization</li>
                    <li>Coordinating with academic teams for campaign alignment</li>
                    <li>Supporting brand visibility and admission-focused growth strategies</li>
                </ul>
                
                <h5>🔹 Additional Accounts</h5>
                <ul>
                    <li><strong>Pick Your College</strong> - Supporting nationwide admission campaigns</li>
                    <li><strong>Pick Your House</strong> - Managing digital visibility for real estate</li>
                    <li><strong>TET Mentor</strong> - Handling campaigns for teacher eligibility test preparation</li>
                    <li><strong>Medloogle</strong> - Supporting healthcare lead generation</li>
                    <li><strong>Velocitech</strong> - B2B digital presence and lead acquisition</li>
                </ul>
            `
        },
        {
            icon: '🏢',
            company: 'NP Ventures',
            title: 'Digital Marketing & Operations Executive',
            type: 'Full-time | Remote',
            location: '📍 Erode, Tamil Nadu',
            date: '🗓 Feb 2025 – Jul 2025',
            details: `
                <ul>
                    <li>Managed digital marketing activities alongside operational responsibilities</li>
                    <li>Coordinated internal processes between marketing, operations, and execution teams</li>
                    <li>Supported lead generation, campaign tracking, and performance reporting</li>
                    <li>Assisted in building scalable workflows for business operations</li>
                </ul>
            `
        },
        {
            icon: '🏢',
            company: 'Green Nest Properties',
            title: 'Digital Marketing Executive → Digital Marketing Manager',
            type: 'Full-time | On-site',
            location: '📍 Coimbatore, Tamil Nadu',
            date: '🗓 Nov 2023 – Jan 2025',
            details: `
                <p style="margin-bottom: 15px;">I joined as a Digital Marketing Executive and was promoted to Digital Marketing Manager based on performance and ownership.</p>
                
                <h4>Key Contributions:</h4>
                <ul>
                    <li>Planned and executed digital marketing campaigns for real estate projects</li>
                    <li>Managed Google Ads and Meta Ads for property lead generation</li>
                    <li>Improved online visibility through SEO and content strategies</li>
                    <li>Worked closely with sales teams to improve lead quality and conversion rates</li>
                    <li>Owned end-to-end campaign execution, optimization, and reporting</li>
                </ul>
            `
        },
        {
            icon: '💼',
            company: 'Freelance Digital Marketing Consultant',
            title: 'Independent | Remote',
            type: '',
            location: '',
            date: '🗓 Jan 2021 – Oct 2023',
            details: `
                <p style="margin-bottom: 20px;">I worked as a freelance digital marketer supporting startups, small businesses, and individual founders with end-to-end digital marketing execution. This phase helped me build strong hands-on fundamentals, client-handling skills, and multi-industry exposure.</p>
                
                <h4>Key Responsibilities & Work Scope</h4>
                <ul>
                    <li>Planned and executed SEO, Google Ads, and Meta Ads campaigns</li>
                    <li>Built lead generation funnels for education, service, and product-based businesses</li>
                    <li>Supported brand visibility through content strategy and social media marketing</li>
                    <li>Performed keyword research, on-page SEO, and basic technical SEO</li>
                    <li>Set up conversion tracking, analytics, and reporting</li>
                    <li>Worked directly with founders to understand business goals and translate them into marketing actions</li>
                </ul>
                
                <h4>Notable Outcomes</h4>
                <ul>
                    <li>Generated consistent inbound leads for multiple clients</li>
                    <li>Gained experience across education, real estate, healthcare, e-commerce, and service businesses</li>
                    <li>Developed strong problem-solving skills through real-world testing and optimization</li>
                    <li>Built the foundation for later full-time roles and leadership responsibilities</li>
                </ul>
            `
        }
    ];

    // Create experience cards
    experiences.forEach((exp, index) => {
        const card = document.createElement('div');
        card.className = 'experience-card';
        card.setAttribute('data-index', index);

        card.innerHTML = `
            <div class="experience-header">
                <div class="experience-icon">${exp.icon}</div>
                <div class="experience-meta">
                    <h3>${exp.company}</h3>
                    <p class="experience-title">${exp.title}</p>
                    ${exp.type ? `<p class="experience-details">${exp.type}${exp.location ? ' | ' + exp.location : ''}</p>` : ''}
                    <p class="experience-date">${exp.date}</p>
                </div>
                <button class="experience-toggle" onclick="toggleExperience(this)" aria-label="Toggle details">
                    <span>▼</span>
                </button>
            </div>
            <div class="experience-content">
                ${exp.details}
            </div>
        `;

        container.appendChild(card);
    });

    // Add summary card
    const summary = document.createElement('div');
    summary.className = 'experience-summary';
    summary.innerHTML = `
        <h3>🔍 Experience Summary</h3>
        <div class="summary-grid">
            <div>
                <h4>Domains Worked:</h4>
                <p>Education (JEE, NEET, TET, Admissions), Real Estate, Healthcare, SaaS, Manufacturing</p>
            </div>
            <div>
                <h4>Core Strengths:</h4>
                <p>End-to-end digital marketing, performance ads, lead generation, funnel systems, operations, MarTech execution, SaaS demos</p>
            </div>
            <div>
                <h4>Work Style:</h4>
                <p>Hands-on, data-driven, ownership-focused, adaptable across industries</p>
            </div>
        </div>
    `;
    container.appendChild(summary);

    // Initialize sticky scroll behavior with GSAP
    initializeStickyScroll();
}

// ============================================
// BUILD PROJECTS SECTION
// ============================================
function buildProjectsSection() {
    const container = document.getElementById('projects-scroll');
    if (!container) return;

    const projects = [
        {
            tag: 'MarTech Platform',
            title: 'Digi Logam',
            description: 'End-to-end digital marketing system built for managing multi-client campaigns, lead tracking, and performance reporting.',
            stats: [
                { value: '10+', label: 'Clients' },
                { value: '30%', label: 'Efficiency Gain' }
            ]
        },
        {
            tag: 'Performance Marketing',
            title: 'Lead Generation Campaigns',
            description: 'High-converting performance marketing campaigns across Google and Meta Ads for education, real estate, and healthcare sectors.',
            stats: [
                { value: '20K+', label: 'Leads Generated' },
                { value: '40%', label: 'CPL Reduction' }
            ]
        },
        {
            tag: 'Funnel Optimization',
            title: 'Lead Generation Funnel Systems',
            description: 'Full-funnel systems designed to convert cold traffic into qualified leads through strategic landing pages and nurture sequences.',
            stats: [
                { value: '65%', label: 'Conversion Rate' },
                { value: '5+', label: 'Industries' }
            ]
        },
        {
            tag: 'Personal Brand',
            title: 'Personal Brand Website & SEO',
            description: 'Building online authority through content marketing, technical SEO, and thought leadership in digital marketing.',
            stats: [
                { value: 'Top 10', label: 'Keywords Ranked' },
                { value: '200%', label: 'Traffic Growth' }
            ]
        },
        {
            tag: 'Brand Projects',
            title: 'Papauni, Ammaaura, Ruva',
            description: 'Strategic brand positioning and digital presence development for emerging D2C and service brands.',
            stats: [
                { value: '3+', label: 'Brands Launched' },
                { value: '150%', label: 'Engagement Growth' }
            ]
        }
    ];

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        let statsHTML = '';
        if (project.stats) {
            statsHTML = `
                <div class="project-stats">
                    ${project.stats.map(stat => `
                        <div class="project-stat">
                            <div class="project-stat-value">${stat.value}</div>
                            <div class="project-stat-label">${stat.label}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        card.innerHTML = `
            <span class="project-tag">${project.tag}</span>
            <h3>${project.title}</h3>
            <p class="project-description">${project.description}</p>
            ${statsHTML}
        `;

        container.appendChild(card);
    });
}

// ============================================
// TOGGLE EXPERIENCE DETAILS
// ============================================
function toggleExperience(button) {
    const card = button.closest('.experience-card');
    const content = card.querySelector('.experience-content');
    const isActive = content.classList.contains('active');

    // Close all other cards
    document.querySelectorAll('.experience-content').forEach(c => {
        c.classList.remove('active');
        c.parentElement.querySelector('.experience-toggle').classList.remove('active');
    });

    // Toggle current card
    if (!isActive) {
        content.classList.add('active');
        button.classList.add('active');
    }
}

// Make function global
window.toggleExperience = toggleExperience;

// ============================================
// STICKY SCROLL BEHAVIOR WITH GSAP
// ============================================
function initializeStickyScroll() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const cards = document.querySelectorAll('.experience-card');

    cards.forEach((card, index) => {
        ScrollTrigger.create({
            trigger: card,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => card.classList.add('active'),
            onLeave: () => card.classList.remove('active'),
            onEnterBack: () => card.classList.add('active'),
            onLeaveBack: () => card.classList.remove('active')
        });
    });
}

console.log('✅ Experience timeline and projects initialized');
