/* ===== MAIN.JS ===== */

/* --- Preloader --- */
(function () {
  const bar = document.getElementById('preloaderBar');
  const preloader = document.getElementById('preloader');
  if (!bar || !preloader) return;
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) { progress = 100; clearInterval(interval); }
    bar.style.width = progress + '%';
    if (progress >= 100) {
      setTimeout(() => { preloader.classList.add('done'); }, 400);
    }
  }, 200);
  window.addEventListener('load', () => {
    progress = 100;
    bar.style.width = '100%';
    clearInterval(interval);
    setTimeout(() => { preloader.classList.add('done'); }, 400);
  });
})();

document.addEventListener('DOMContentLoaded', () => {

  /* --- Custom Cursor --- */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
    function animateRing() { rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animateRing); }
    animateRing();
    document.querySelectorAll('a, button, .service-card, .project-card, .timeline-item').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* --- Navbar Scroll --- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 50); });

  /* --- Mobile Nav --- */
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger) {
    hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { hamburger.classList.remove('active'); navLinks.classList.remove('open'); }));
  }

  /* --- Typing Effect --- */
  const roles = ['Full-Stack Developer', 'AI Engineer', 'Computer Vision Specialist', 'Photographer & Filmmaker', 'Cloud Computing Enthusiast', 'Hackathon Builder', 'Creative Technologist'];
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    let ri = 0, ci = 0, deleting = false;
    function typeLoop() {
      const word = roles[ri];
      if (!deleting) {
        typedEl.textContent = word.substring(0, ci + 1);
        ci++;
        if (ci === word.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
        setTimeout(typeLoop, 80);
      } else {
        typedEl.textContent = word.substring(0, ci - 1);
        ci--;
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(typeLoop, 400); return; }
        setTimeout(typeLoop, 40);
      }
    }
    setTimeout(typeLoop, 1000);
  }

  /* --- Scroll Reveal --- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  /* --- Counter Animation --- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.count);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          e.target.textContent = current + '+';
        }, 40);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  /* --- Project Filter --- */
  const filterBtns = document.querySelectorAll('.projects-tabs button');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.add('show');
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.classList.remove('show');
        }
      });
    });
  });

  /* --- Active Nav Link --- */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) { link.classList.toggle('active', scrollY >= top && scrollY < top + height); }
    });
  });

  /* --- Smooth Scroll --- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* --- Contact Form --- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      setTimeout(() => { btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>'; btn.style.background = ''; form.reset(); }, 3000);
    });
  }

  /* --- Parallax on Hero --- */
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-visual');
    if (hero) hero.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.15}px))`;
  });

  /* --- Project Modal --- */
  const projectData = {
    1: {
      title: 'Glamscrap Technologies',
      num: 'Project 01 — Website',
      image: 'assets/project-glamscrap.png',
      tech: ['HTML/CSS', 'JavaScript', 'SEO', 'Responsive Design'],
      url: 'https://glamscrap.in',
      desc: 'Developed a modern, fully responsive company portfolio website for Glamscrap Technologies Pvt. Ltd — a company focused on transforming waste into eco-friendly products. The site showcases their sustainability mission, product lineup, and services with a clean, professional design language. Built with a focus on search engine optimization to improve organic visibility, the website features smooth scrolling, optimized media loading, and a mobile-first approach. This project was completed during an internship at Glamscrap, where I also contributed as a Market Research Analyst, conducting SEO audits and competitive analysis to inform the site\'s content strategy.'
    },
    2: {
      title: 'ASME SRIT Student Section Website',
      num: 'Project 02 — Website',
      image: 'assets/project-asme.png',
      tech: ['Web Development', 'Responsive', 'UI/UX', 'Content Strategy'],
      url: 'https://asmesrit.org',
      desc: 'Designed and developed the official website for the ASME SRIT Student\'s Section — projecting the section to a global audience. The site serves as a digital hub for the student chapter, featuring event highlights, team profiles, activity showcases, and membership information. Built to represent the professional standards of ASME (American Society of Mechanical Engineers), the website reflects the section\'s commitment to engineering innovation and student development. As the current Chairperson of ASME SRIT, this project was personally driven to elevate the section\'s digital presence and connect with the broader ASME network worldwide.'
    },
    3: {
      title: 'ASME EFx Event Site',
      num: 'Project 03 — Website',
      image: 'assets/project-efx.png',
      tech: ['Event Site', 'Registration', 'Responsive', 'SEO'],
      url: 'https://efx.asmesrit.org',
      desc: 'Built a dedicated event website for the ASME Engineering Festivals (EFx) hosted by SRIT. EFx is a flagship program by ASME that brings together students from across institutions to celebrate engineering through hands-on activities, design challenges, and technical workshops. The site features comprehensive event details, schedules, speaker profiles, registration workflows, and photo galleries. Designed with a modern, event-centric aesthetic to drive registrations and engagement, the site played a key role in the successful execution of EFx SRIT 2026.'
    },
    4: {
      title: 'ASME TNNOVATE SDG Innovation Expo',
      num: 'Project 04 — Website',
      image: 'assets/project-tnnovate.png',
      tech: ['Event Site', 'Registration', 'SDG', 'Responsive'],
      url: 'https://tnnovate.asmesrit.org',
      desc: 'Built the official event website for ASME TNNOVATE — the SDG Innovation Expo organized by ASME SRIT Student\'s Section. The expo brings together students, researchers, and innovators to showcase projects aligned with the United Nations Sustainable Development Goals. The website features event details, SDG theme breakdowns, registration workflows, speaker profiles, sponsor showcases, and a results portal. Designed with an engaging, modern aesthetic to drive participation and awareness around sustainability-focused engineering innovation. The site played a key role in marketing and managing registrations for the event.'
    },
    5: {
      title: 'NeuroBeats — AutiMagic',
      num: 'Project 05 — Product Site',
      image: 'assets/project-neurobeats.png',
      tech: ['Next.js', 'IoT', 'AI', 'Arduino', 'Raspberry Pi'],
      url: 'https://neurobeats-autimagic.vercel.app/',
      desc: 'NeuroBeats is a product of AutiMagic — an AI-powered smart bongos system designed to make autism therapy magical, data-driven, and affordable. The system brings effective therapy to children with autism at 85-90% lower cost than traditional methods. I developed the product landing page using Next.js, showcasing the smart bongos instrument which features integrated force sensors (FSR), LED feedback, wireless connectivity, and a durable child-safe design. The hardware side uses Arduino and Raspberry Pi for real-time sensor data capture and video response generation, enabling interactive learning and gesture recognition for children with autism spectrum disorder.'
    },
    6: {
      title: 'Catechism Student Management System',
      num: 'Project 06 — Management Portal',
      image: 'assets/project-csmsjc.png',
      tech: ['Firebase', 'Full-Stack', 'Analytics', 'Real-time DB', 'Auth'],
      url: 'https://csmsjc.vercel.app',
      desc: 'A comprehensive student information management system developed for St. Jude\'s Shrine Catechism. This full-fledged portal manages all aspects of student data — attendance tracking, assessment management, grade recording, and complete student information records. Functioning like a complete school management application, it covers student enrollment, class assignments, progress reports, and administrative dashboards. Built on Firebase with real-time database synchronization, secure authentication, and role-based access control. The system supports multiple user roles including administrators, teachers, and coordinators, with year-based data architecture for academic session management.'
    },
    7: {
      title: 'Early Angel Tracking Portal',
      num: 'Project 07 — IMS Module',
      image: 'assets/project-earlyangel.png',
      tech: ['Firebase', 'Full-Stack', 'Gamification', 'Real-time'],
      url: '',
      desc: 'An add-on module built for the Catechism Student Management System (CSMSJC) to track and award students who arrive early to catechism classes. The Early Angel system automatically logs arrival times, compares them against the scheduled class start time, and maintains a leaderboard of consistently early students. Features include automated early arrival detection, point-based reward tracking, certificate generation for top performers, and analytics dashboards showing punctuality trends across classes. The module gamifies punctuality, encouraging positive behavior among students while giving teachers and coordinators real-time visibility into attendance patterns. Seamlessly integrated with the main CSMSJC platform using shared Firebase infrastructure.'
    },
    8: {
      title: 'VBS Class Attendance Portal',
      num: 'Project 08 — IMS Module',
      image: 'assets/project-vbs.png',
      tech: ['Firebase', 'Attendance', 'Analytics', 'Real-time'],
      url: '',
      desc: 'A dedicated portal developed for Vacation Bible School (VBS) attendance management, built as an extension of the Catechism Student Management System ecosystem. The portal handles VBS-specific workflows including class enrollments, daily attendance marking, session-wise tracking, and summary reports. Teachers can mark attendance in real-time with a simple interface, while administrators get consolidated analytics showing attendance rates, dropout patterns, and class-wise participation metrics. The system supports multi-day VBS programs with configurable session schedules and generates completion certificates for students who meet attendance thresholds. Built on Firebase with the same authentication and data architecture as the parent CSMSJC platform.'
    },
    9: {
      title: 'SRIT Visitor Management System',
      num: 'Project 09 — Gatepass Application',
      image: 'assets/project-gatepass.jpeg',
      tech: ['Full-Stack', 'Real-time', 'Security', 'Access Control'],
      url: '',
      desc: 'Developed a comprehensive visitor management and gatepass application for Sri Ramakrishna Institute of Technology. The system provides real-time tracking and management of all visitors entering the institute, replacing manual log registers with a digital solution. Features include visitor registration with photo capture, purpose of visit logging, host notification, check-in/check-out timestamps, visitor history search, and daily/weekly analytics reports. The system enhances institutional security by maintaining a complete digital trail of all visitor interactions and enables the administration to generate compliance reports on demand.'
    },
    10: {
      title: 'CV Quality Analyser — Industrial',
      num: 'Project 10 — Computer Vision',
      image: 'assets/project-cvqual.png',
      tech: ['YOLO', 'OpenCV', 'X-Ray Imaging', 'ASTM Standards', 'Python'],
      url: '',
      desc: 'Developed a Computer Vision-based quality inspection application for finding defects on automotive parts using YOLO object detection models on X-Ray imaging. The system was trained as per ASTM (American Society for Testing and Materials) standards and currently operates with approximately 90% accuracy in detecting manufacturing defects. Built for a major MNC company, the application processes X-Ray images of die-cast automotive components, identifies defect types such as porosity, cracks, and inclusions, and classifies them by severity level. The system significantly reduces manual inspection time and improves quality assurance consistency across production lines. (Note: The cover image is AI Generated, in order to maintain the confidentiality of the product.)'
    },
    11: {
      title: 'CVAT Annotator — Offline Tool',
      num: 'Project 11 — Desktop Application',
      image: 'assets/project-cvat.png',
      tech: ['Image Annotation', 'YOLO', 'Desktop App', 'Python', 'UI/UX'],
      url: '',
      desc: 'Developed a custom offline image annotation application specifically designed for YOLO training dataset preparation. Built as a companion tool for the CV Quality Analyser project, this annotator was created to maintain complete confidentiality of the industrial dataset — ensuring that no sensitive X-Ray images or proprietary defect data leave the secure network. The tool supports bounding box annotation, class labeling, dataset splitting, and export in YOLO-compatible format. Features include batch annotation workflows, zoom and pan controls, annotation review mode, and dataset statistics visualization. This tool eliminated the need for cloud-based annotation platforms, keeping all proprietary data fully offline and secure.'
    },
    12: {
      title: 'Conversational Image Recognition Chatbot',
      num: 'Project 12 — AI Research',
      image: 'assets/project-circby.png',
      tech: ['VGG-16', 'NLP', 'LSTM', 'Late Fusion Encoder', 'Deep Learning'],
      url: 'https://www.youtube.com/watch?v=LJVBYjCMYLc/',
      desc: 'This project focuses on developing a Conversational Image Recognition Chatbot that integrates Natural Language Processing (NLP) with image recognition to facilitate real-time, interactive conversations based on visual inputs. The chatbot utilizes the VGG-16 deep learning model for object recognition, allowing it to accurately identify objects within uploaded images. Once image features are extracted, the system processes user queries through an NLP module to generate contextually relevant responses. A Late Fusion Encoder integrates image data with conversational history, ensuring responses reflect both visual content and ongoing dialogue. Future upgrades include implementing LSTM alongside large language models (LLMs) for enhanced conversational capabilities. The system is designed for scalability using cloud infrastructure and is applicable in e-commerce (product identification), healthcare (preliminary medical image analysis), and security (object detection in surveillance).'
    },
    13: {
      title: 'AI Laser QR Marking — Indian Railways',
      num: 'Project 13 — Smart India Hackathon 2025',
      image: 'assets/project-railways.jpg',
      tech: ['SIH 2025', 'OpenCV', 'TensorFlow', 'QR/Datamatrix', 'Mobile App'],
      url: '',
      desc: 'Developed for Smart India Hackathon 2025 under the problem statement "AI-based development of Laser QR Code marking on track fittings in Indian Railways". The solution introduces a portable laser engraving system that marks unique, durable QR/Datamatrix codes on railway track fittings (clips, pads, liners, sleepers). These codes link to a centralized database recording vendor details, procurement history, warranty status, and inspection records — ensuring end-to-end traceability. The system integrates AI-driven defect detection using OpenCV and TensorFlow to verify engraving quality and flag anomalies. A companion mobile application allows railway staff to instantly scan codes, fetch lifecycle details, and sync data with Indian Railways\' UDM & TMS platforms. The solution provides analytics dashboards for predictive insights and warranty management. Impact includes improved railway safety, savings of crores annually by cutting fraud, and paperless workflows. This represents a first-of-its-kind integration of Laser + AI + UDM/TMS for asset management.'
    },
    14: {
      title: 'Waterborne Disease Early Warning System',
      num: 'Project 14 — KPRIET Fiestaa Hackathon',
      image: 'assets/project-waterborne.jpg',
      tech: ['XGBoost', 'Streamlit', 'GIS', 'Spatial Modeling', 'Python'],
      url: '',
      desc: 'Developed for the KPRIET Fiestaa Gen AI Hackathon — an AI-powered early warning system to predict waterborne disease outbreaks at the ward level using spatial and machine learning techniques. The platform analyzes environmental, spatial, and historical disease data to forecast potential outbreaks up to 7 days in advance. Using the XGBoost machine learning algorithm combined with spatial modeling, the system identifies high-risk regions and generates risk scores for preventive action. An interactive Streamlit dashboard visualizes outbreak risks, spatial patterns, and prediction insights, enabling health authorities to monitor trends, explore ward-level risk distribution, and support early decision-making for targeted interventions. Impact includes enabling early detection and prevention of waterborne disease outbreaks, helping authorities prioritize high-risk zones, and providing a scalable framework for smart city health monitoring.'
    },
    15: {
      title: 'ASCDIT — Survey Analytics Platform',
      num: 'Project 15 — TANCAM TN-IMPACT 2026',
      image: 'assets/project-ascdit.jpg',
      tech: ['Python', 'Streamlit', 'AI/ML', 'Data Analytics', 'Automation'],
      url: '',
      desc: 'Developed for TANCAM TN-IMPACT 2026 — an AI-driven platform for automated survey data processing, analysis, and reporting. The system allows users to upload raw survey datasets, automatically clean and preprocess data, apply weighting mechanisms, and generate meaningful statistical insights. It integrates AI-assisted data validation, anomaly detection, and automated reporting tools that simplify traditionally complex survey analysis workflows. Interactive dashboards and visualization modules allow researchers, organizations, and policymakers to explore survey trends, demographic insights, and response distributions in real time. The platform also enables automated report generation, converting raw survey responses into structured analytical summaries. Built using Python, Streamlit, and modern data processing libraries for scalable handling of large datasets.'
    },
    16: {
      title: 'AI-Powered Invoice Auditor',
      num: 'Project 16 — FinTech Automation',
      image: 'assets/project-invoice.jpg',
      tech: ['OCR', 'IMAP', 'Streamlit', 'Business Validation', 'Pipeline'],
      url: 'https://avartech-pocv1.streamlit.app/',
      desc: 'An intelligent invoice auditing system that uses IMAP to fetch bills directly from email, performs OCR to extract data from invoices, and runs business validation checks to determine bill authenticity. The system implements a complete multi-stage pipeline: clerks upload bills and perform initial verification checks, managers review and verify the extracted data, payment matching is performed against bank statements, and finally auditors account the validated bills for audit trail. The platform automates what was previously a manual, error-prone process — reducing processing time, catching discrepancies early, and maintaining a complete audit trail for compliance. Built with Streamlit for an accessible interface that non-technical staff can operate.'
    },
    17: {
      title: 'AcoustiScan Pro',
      num: 'Project 17 — Under Development',
      image: 'assets/project-acoustiscan.jpg',
      tech: ['Acoustic NDT', 'Thermal Imaging', 'AI', 'In-line Inspection'],
      url: '',
      desc: 'AcoustiScan Pro is an innovative non-destructive testing (NDT) system currently under active development. The project proposes using acoustic wave analysis combined with thermal imaging to detect defects in aluminium die castings — eliminating the need for traditional X-Ray inspection methods. The key innovation is that the proposed method enables in-line inspection directly on the production floor, rather than requiring a separate X-Ray setup with its associated radiation safety requirements. This approach significantly reduces inspection time and cost while maintaining detection accuracy. The system processes acoustic signatures and thermal patterns using AI models to identify internal defects such as porosity, shrinkage, and cold shuts in cast aluminium components.'
    },
    18: {
      title: 'NPS Retirement Forecasting — PFRDA',
      num: 'Project 18 — PFRDA Hackathon 2026',
      image: 'assets/project-nps.jpg',
      tech: ['FinTech', 'Predictive Analytics', 'Full-Stack', 'Data Visualization'],
      url: '',
      desc: 'Developed for the PFRDA Hackathon 2026 – Innovate4NPS, organized in collaboration with SIIC, IIT Kanpur. This predictive analytics platform enables NPS (National Pension System) subscribers to estimate their retirement corpus and expected pension outcomes under multiple contribution scenarios. By integrating predictive modeling with financial simulation techniques, users can analyze how monthly contributions, investment duration, and expected returns impact long-term retirement wealth. The system provides dynamic calculators, scenario comparison dashboards, and interactive visualizations that simplify complex pension calculations into intuitive insights. Users can experiment with different contribution strategies and immediately view projected outcomes. The platform supports PFRDA\'s vision of a transparent, technology-driven pension ecosystem and demonstrates how fintech and interactive data visualization can transform pension planning into a user-friendly financial decision platform.'
    }
  };

  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  if (modal && modalClose) {
    // Open modal on card click
    document.querySelectorAll('.project-card[data-project]').forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't open modal if clicking a link inside the card
        if (e.target.closest('.project-links')) return;
        const id = card.dataset.project;
        const data = projectData[id];
        if (!data) return;
        document.getElementById('modalNum').textContent = data.num;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalDesc').textContent = data.desc;
        document.getElementById('modalImage').src = data.image;
        document.getElementById('modalImage').alt = data.title;
        // Tech tags
        const techEl = document.getElementById('modalTech');
        techEl.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
        // Link
        const linkEl = document.getElementById('modalLink');
        if (data.url) { linkEl.href = data.url; linkEl.style.display = 'inline-flex'; }
        else { linkEl.style.display = 'none'; }
        // Show
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    // Close modal
    function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });
  }

  /* --- Patent Modal --- */
  const patentData = {
    1: {
      title: 'Electroencephalographic Brain-Computer Interface System for Immersive Virtual Reality Navigation with Six Degrees of Freedom Control for Accessibility-Enhanced Educational Tours',
      num: 'Patent No: 202541072782 · Filed: July 31, 2025',
      image: 'assets/patent-bci.png',
      tech: ['EEG', 'Brain-Computer Interface', 'VR Navigation', '6-DOF', 'Deep Learning', 'Accessibility'],
      applicants: 'Rajkumar Immanual, Nithyananthakumar Sanjana, Alan Sahayaraj, Aswin Bharath, Saravanan Vigneshwari, Hussain Mustafa Ali, Janani Ekambaram, Jaisre Kannan, Sharun Kumar',
      desc: 'An electroencephalographic brain-computer interface system for immersive virtual reality navigation with six degrees of freedom control for accessibility-enhanced educational tours. The system comprises an EEG signal acquisition module, an AI processing unit, a touch sensor interface controller, and a VR content management system. The EEG signal acquisition module captures motor cortex brainwave signals using wireless dry electrodes. The AI processing unit executes deep neural networks to classify movement intentions across six degrees of freedom with accuracy greater than 90%. The touch sensor interface controller generates synthetic touch inputs based on classified brain signals for automated VR navigation. The VR content management system integrates with YouTube VR platform for immersive educational tours. The system processes brain signals in real-time with response latency less than 200 milliseconds, enabling hands-free virtual reality navigation specifically designed for users with mobility limitations. The system provides comprehensive accessibility features for inclusive educational experiences, allowing thought-controlled exploration of academic institutions through 360-degree virtual tours without requiring physical movement or manual input devices.'
    },
    2: {
      title: 'AI-Based Automatic Visual Inspection System for Small Scale MSME Manufacturing',
      num: 'Patent Filed: 2026',
      image: 'assets/patent-vis.png',
      tech: ['Computer Vision', 'Robotic Inspection', 'Edge AI', 'Deep Learning', 'MSME', 'Quality Control'],
      applicants: 'Rajkumar Immanual, Nithyananthakumar Sanjana, Sheela Sobana Rani, Alan Sahayaraj, Naveenkumar Balasubramaniyan, Senbagapriya Selvan, Kamaleshwaran Perumal, Kalaiselvan Srinivasan, Prasanna Thangapandi',
      desc: 'An AI-based automatic visual inspection system for MSME manufacturing comprising a transparent inspection enclosure, a part-handling robotic arm with gripper end-effector, dual camera robotic arms each carrying high-resolution industrial cameras, a diffused LED illumination module with strobe trigger controller, and an edge computing platform executing an AI defect detection engine. The part-handling arm picks, positions, and reorients the part inside the transparent enclosure while the camera arms capture multi-view images from complementary angular positions. The AI defect detection engine performs deep-learning inference on the multi-view image set to detect and classify surface defects including scratches, cracks, burrs, dimensional deviations, and pits, returning a pass/fail decision with defect location and confidence score. The handling arm sorts the part to accept or reject bins and the data logging module records full inspection traceability metadata. The system achieves inspection cycle times of 8 to 15 seconds, detection accuracy exceeding 92%, and is deployable on low-cost edge hardware making it accessible for small and medium manufacturing enterprises.'
    }
  };

  const patentModal = document.getElementById('patentModal');
  const patentModalClose = document.getElementById('patentModalClose');
  if (patentModal && patentModalClose) {
    document.querySelectorAll('.patent-card[data-patent]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.patent;
        const data = patentData[id];
        if (!data) return;
        document.getElementById('patentModalNum').textContent = data.num;
        document.getElementById('patentModalTitle').textContent = data.title;
        document.getElementById('patentModalDesc').textContent = data.desc;
        document.getElementById('patentModalImage').src = data.image;
        document.getElementById('patentModalImage').alt = data.title;
        document.getElementById('patentModalApplicants').textContent = data.applicants;
        const techEl = document.getElementById('patentModalTech');
        techEl.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
        patentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    function closePatentModal() { patentModal.classList.remove('active'); document.body.style.overflow = ''; }
    patentModalClose.addEventListener('click', closePatentModal);
    patentModal.addEventListener('click', (e) => { if (e.target === patentModal) closePatentModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && patentModal.classList.contains('active')) closePatentModal(); });
  }

});

/* Fade in up keyframe for filter */
const style = document.createElement('style');
style.textContent = `@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(style);
