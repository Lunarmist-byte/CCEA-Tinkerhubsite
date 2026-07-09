document.addEventListener('DOMContentLoaded', () => {
    const inputScreen = document.getElementById('inputScreen');
    const revealScreen = document.getElementById('proto-glass');
    const resetBtn = document.getElementById('resetBtn');
    const revealBtn = document.getElementById('revealBtn');
    const userNameInput = document.getElementById('userName');

    const roleBadge = document.getElementById('roleBadge');
    const roleTitle = document.getElementById('roleTitle');
    const nameDisplay = document.getElementById('nameDisplay');
    const letterBody = document.getElementById('letterBody');
    const glassOverlay = document.getElementById('glassOverlay');
    const wipeTextInstruction = document.getElementById('wipeTextInstruction');
    const interactionLayer = document.getElementById('interactionLayer');
    const scratchPaths = document.getElementById('scratchPaths');
    const downloadBtn = document.getElementById('downloadBtn');
    const letterCard = document.getElementById('letterCard');

    let currentRole = 'lead';
    let isDrawing = false;
    let lastX = 0, lastY = 0;
    let scratchDistance = 0;
    const DISTANCE_THRESHOLD = 5000;
    let isCompleted = false;

    const candidateDatabase = {
        "Vasudev K S": { role: "subteam", title: "Outreach Volunteer" },
        "Krishna Priya U P": { role: "subteam", title: "Women in Tech Volunteer" },
        "Navaneeth P": { role: "lead", title: "Learning Coordinator" },
        "Aswin P": { role: "subteam", title: "Learning Coordinator Volunteer" },
        "Sreelakshmi G": { role: "subteam", title: "Learning Coordinator Volunteer" },
        "Parvathi Jayaprakash": { role: "subteam", title: "Learning Coordinator Volunteer" },
        "Adhil Rasheed": { role: "subteam", title: "Learning Coordinator Volunteer" },
        "Goutham Sankar": { role: "subteam", title: "Learning Coordinator Volunteer" },
        "Krishnendu V": { role: "lead", title: "Women in Tech Lead" },
        "Uthara Uthaman": { role: "subteam", title: "Women In Tech Volunteer" },
        "Rishikesh Krishna": { role: "subteam", title: "Outreach Volunteer" },
        "Aravind P R": { role: "subteam", title: "Outreach Volunteer" },
        "Aswin S Tushar": { role: "subteam", title: "Outreach Volunteer" },
        "Muhammed Irfan Rafeek": { role: "lead", title: "Outreach Lead" },
    };

    const contentMap = {
        'lead': {
            badge: 'Core Team Selection',
            title: 'Core Team Member',
            body: `
                <p>I wanted to personally reach out and tell you how incredibly impressed I was reading through your application and getting to know you during the interview. Out of a highly competitive pool of talented candidates, your vision, your raw passion for tech, and your natural leadership potential genuinely stood out to us.</p>
                <p>TinkerHub is fundamentally about peer-to-peer learning and building a collaborative culture where everyone can upskill together. During our conversation, I saw that exact community-first spark in you. The journey we have ahead of us is going to demand a lot from all of us, but I promise you it is going to be one of the most rewarding experiences of your college life.</p>
                <p>I am absolutely thrilled to officially welcome you to the core team as our <span class="highlight-title">{TITLE}</span>. Let's push boundaries, empower our peers to tinker, and build something truly amazing together this year.</p>
            `
        },
        'subteam': {
            badge: 'Sub-Team Selection',
            title: 'Sub-Team Member',
            body: `
                <p>I wanted to personally thank you for applying and taking the time to speak with us during the interview. We received an overwhelming number of applications this year, and I have to tell you—your skills, your enthusiasm, and the unique perspective you shared with us truly stood out.</p>
                <p>TinkerHub's mission relies entirely on passionate individuals who want to learn, build, and grow together. While the core lead positions were strictly limited, I absolutely could not afford to let your talent and drive slip away from our community.</p>
                <p>Because of that, I am so excited to personally invite you to join our <strong>Sub-Team</strong> as a <span class="highlight-title">{TITLE}</span>. You will be working directly with me and the core leads on our biggest initiatives to foster peer-to-peer learning. You are going to be a crucial part of our success, and I can't wait to see what we build together.</p>
            `
        }
    };

    const specificContentMap = {
        'Outreach Lead': `
            <p>I am absolutely thrilled to officially welcome you to the core team as our <span class="highlight-title">Outreach Lead</span>!</p>
            <p>When we envisioned the future of TinkerHub CE Alappuzha, we knew we needed someone who doesn't just understand media, but someone who truly understands <em>people</em>. The story we tell and the way we connect with our peers is the heartbeat of everything we do. Through your lens, your words, and your creative vision, you are going to be the bridge that shows every single student that they have a safe place here to learn, build, and belong.</p>
            <p>This role is so much more than just communication—it is about shaping our narrative and sparking a genuine movement on campus. The journey ahead of us is going to demand a lot of your creative energy, your late-night ideas, and your passion, but I promise you that looking back, this will be one of the most profoundly rewarding chapters of your college life. We believe in your spark, and we are so incredibly grateful to have your voice leading our outreach.</p>
            <p>Let's push boundaries, empower our peers, and build a story that inspires everyone around us to start tinkering. Welcome to the family.</p>
            <p style="margin-top: 1.5rem; font-weight: 700;">Never give up!</p>
        `,
        'Women in Tech Lead': `
            <p>I am absolutely thrilled to officially welcome you to the core team as our <span class="highlight-title">Women in Tech Lead</span>!</p>
            <p>When we look at the future of TinkerHub CE Alappuzha, we know that true innovation requires diverse voices. We needed someone with the empathy, strength, and unwavering dedication to ensure that every woman on this campus feels empowered to code, build, and lead. You are going to be the guiding light that helps shatter stereotypes and creates a truly inclusive, safe space for women to thrive in technology.</p>
            <p>This role is about so much more than just organizing events—it is about building a sisterhood. It is about being the mentor, the champion, and the representation that our peers need to confidently step into the tech ecosystem. The road ahead will require a lot of heart and resilience, but I promise you that watching the women you inspire find their wings will be one of the most profoundly rewarding experiences of your college life. We believe deeply in your ability to spark this change.</p>
            <p>Let's push boundaries, empower our peers, and build a community where everyone truly belongs. Welcome to the family.</p>
            <p style="margin-top: 1.5rem; font-weight: 700;">Never give up!</p>
        `,
        'Learning Coordinator': `
            <p>I am absolutely thrilled to officially welcome you to the core team as our <span class="highlight-title">Learning Coordinator</span>!</p>
            <p>At the very core of TinkerHub CE Alappuzha is the belief that anyone can learn anything when given the right guidance and a supportive community. We knew we needed someone with not just a sharp technical mind, but the immense patience and passion required to teach and uplift others. Through your dedication, you are going to be the architect of our learning culture, ensuring that every student who walks through our doors finds the exact resources and support they need to grow.</p>
            <p>This role is the absolute backbone of our mission. It is about designing learning journeys, breaking down complex concepts, and experiencing the incredible joy of seeing a peer finally grasp something new. The year ahead will demand a lot of hard work, careful planning, and problem-solving, but I promise you that being the catalyst for someone else's "aha!" moment will be one of the most deeply rewarding experiences of your college life. We believe completely in your vision for our peer-to-peer learning.</p>
            <p>Let's push boundaries, empower our peers, and build a culture where curiosity always thrives. Welcome to the family.</p>
            <p style="margin-top: 1.5rem; font-weight: 700;">Never give up!</p>
        `
    };

    revealBtn.addEventListener('click', () => {
        const name = userNameInput.value.trim();
        if (!name) {
            alert('Please enter your name');
            return;
        }

        const normalizedInput = name.toLowerCase().replace(/\s+/g, '').trim();
        const candidateKey = Object.keys(candidateDatabase).find(key =>
            key.toLowerCase().replace(/\s+/g, '').trim() === normalizedInput
        );
        const candidateData = candidateKey ? candidateDatabase[candidateKey] : null;

        if (!candidateData) {
            alert('Name not found in candidate database.');
            return;
        }
        
        currentRole = candidateData.role;

        const data = contentMap[currentRole];
        const assignedTitle = candidateData ? candidateData.title : data.title;

        nameDisplay.textContent = name.toLowerCase();
        roleBadge.textContent = data.badge;
        roleTitle.textContent = assignedTitle;

        if (specificContentMap[assignedTitle]) {
            letterBody.innerHTML = specificContentMap[assignedTitle];
        } else {
            letterBody.innerHTML = data.body.replace('{TITLE}', assignedTitle);
        }
        letterCard.style.transition = 'none';
        letterCard.style.opacity = '0';

        initGlass();

        inputScreen.classList.remove('active');
        revealScreen.classList.add('active');

        setTimeout(() => {
            letterCard.style.transition = 'opacity 1s ease';
            letterCard.style.opacity = '1';
        }, 800);
    });

    resetBtn.addEventListener('click', () => {
        revealScreen.classList.remove('active');
        inputScreen.classList.add('active');
        userNameInput.value = '';
    });

    downloadBtn.addEventListener('click', () => {
        downloadBtn.style.opacity = '0';

        const originalTransform = letterCard.style.transform;
        const originalWidth = letterCard.style.width;
        const originalMaxWidth = letterCard.style.maxWidth;
        
        letterCard.style.transform = 'scale(1)';
        letterCard.style.width = '800px';
        letterCard.style.maxWidth = '800px';

        setTimeout(() => {
            html2canvas(letterCard, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                windowWidth: 1024
            }).then(canvas => {
                letterCard.style.transform = originalTransform;
                letterCard.style.width = originalWidth;
                letterCard.style.maxWidth = originalMaxWidth;

                const imgData = canvas.toDataURL('image/png');
                const { jsPDF } = window.jspdf;

                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();

                const canvasRatio = canvas.width / canvas.height;

                const margin = 15;
                const maxImgWidth = pdfWidth - (margin * 2);
                const maxImgHeight = pdfHeight - (margin * 2);

                let imgWidth = maxImgWidth;
                let imgHeight = maxImgWidth / canvasRatio;

                if (imgHeight > maxImgHeight) {
                    imgHeight = maxImgHeight;
                    imgWidth = maxImgHeight * canvasRatio;
                }

                const xOffset = (pdfWidth - imgWidth) / 2;
                const yOffset = (pdfHeight - imgHeight) / 2;

                pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
                pdf.save(`TinkerHub_Selection_${userNameInput.value.trim()}.pdf`);

                downloadBtn.style.opacity = '1';
            }).catch(err => {
                console.error('PDF Generation Error:', err);
                let msg = err.message || String(err);
                if (msg.toLowerCase().includes('security') || msg.toLowerCase().includes('tainted') || msg.toLowerCase().includes('cross-origin')) {
                    msg = "Browser security blocks downloading images when opening the file directly (file://). Please use a local web server (like VS Code Live Server) or host it online to enable PDF downloads.";
                }
                alert('PDF Generation Error: ' + msg);
                downloadBtn.style.opacity = '1';
            });
        }, 100);
    });

    letterCard.addEventListener('click', () => {
        if (isCompleted && letterCard.classList.contains('collapsed')) {
            letterCard.classList.remove('collapsed');
            downloadBtn.style.display = 'flex';
        }
    });

    function initGlass() {
        if (scratchPaths) scratchPaths.innerHTML = '';
        if (wipeTextInstruction) {
            setTimeout(() => {
                wipeTextInstruction.style.opacity = '1';
            }, 100);
        }
        if (glassOverlay) {
            glassOverlay.style.transition = 'none';
            glassOverlay.style.opacity = '1';
            glassOverlay.style.pointerEvents = 'auto';

            void glassOverlay.offsetHeight;

            glassOverlay.style.transition = 'opacity 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        }
        if (interactionLayer) interactionLayer.style.pointerEvents = 'auto';
        if (downloadBtn) downloadBtn.style.display = 'none';

        if (letterCard) letterCard.classList.add('collapsed');

        scratchDistance = 0;
        isCompleted = false;

        if (interactionLayer) {
            interactionLayer.addEventListener('mousedown', startDrawing);
            interactionLayer.addEventListener('mousemove', draw);
            window.addEventListener('mouseup', stopDrawing);

            interactionLayer.addEventListener('touchstart', startDrawing);
            interactionLayer.addEventListener('touchmove', draw);
            window.addEventListener('touchend', stopDrawing);
        }
    }

    function getPos(e) {
        if (!interactionLayer) return { x: 0, y: 0 };
        const rect = interactionLayer.getBoundingClientRect();
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function startDrawing(e) {
        if (isCompleted) return;
        isDrawing = true;
        const pos = getPos(e);
        lastX = pos.x;
        lastY = pos.y;
    }

    function draw(e) {
        if (!isDrawing || isCompleted) return;
        e.preventDefault();

        const pos = getPos(e);

        const dx = pos.x - lastX;
        const dy = pos.y - lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 5) {
            scratchDistance += dist;

            if (wipeTextInstruction) {
                wipeTextInstruction.style.opacity = '0';
            }

            if (scratchPaths) {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', `M ${lastX} ${lastY} L ${pos.x} ${pos.y}`);
                scratchPaths.appendChild(path);
            }

            lastX = pos.x;
            lastY = pos.y;

            if (scratchDistance > DISTANCE_THRESHOLD) {
                finishScratch();
            }
        }
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function finishScratch() {
        isCompleted = true;

        if (glassOverlay) {
            glassOverlay.style.opacity = '0';
            glassOverlay.style.pointerEvents = 'none';
        }
        if (wipeTextInstruction) {
            wipeTextInstruction.style.opacity = '0';
        }
        if (interactionLayer) interactionLayer.style.pointerEvents = 'none';

        if (currentRole === 'lead') {
            const colors = ['#ffc107', '#ffeb3b', '#ffa000', '#ffffff', '#ffd700', '#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'];
            const duration = 5000;
            const animationEnd = Date.now() + duration;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                confetti({
                    particleCount: 15,
                    startVelocity: 0,
                    ticks: 400,
                    origin: { x: Math.random(), y: Math.random() * -0.2 },
                    colors: colors,
                    gravity: 0.8,
                    scalar: 1.2,
                    zIndex: 100
                });

                confetti({
                    particleCount: 10,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors,
                    zIndex: 100
                });

                confetti({
                    particleCount: 10,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors,
                    zIndex: 100
                });
            }, 250);
        }
    }
});
