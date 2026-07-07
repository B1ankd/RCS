
        document.addEventListener('DOMContentLoaded', function() {
            // Intersection Observer for scroll animations
            const sections = document.querySelectorAll('.section');
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -100px 0px'
            });
            
            sections.forEach(section => {
                observer.observe(section);
            });
            
            // Initial animation for hero section
            const heroSectionAnimate = document.querySelector('.hero-inner');
            if (heroSectionAnimate) {
                heroSectionAnimate.style.opacity = '0';
                heroSectionAnimate.style.transform = 'translateY(50px)';
                heroSectionAnimate.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                setTimeout(() => {
                    heroSectionAnimate.style.opacity = '1';
                    heroSectionAnimate.style.transform = 'translateY(0)';
                }, 300);
            }
            
            // Animate content columns with fade in effect
            const contentColumns = document.querySelectorAll('.content-columns');
            contentColumns.forEach(column => {
                const contentImage = column.querySelector('.content-image');
                const contentText = column.querySelector('.content-text');
                
                if (contentImage) {
                    contentImage.style.opacity = '0';
                    contentImage.style.transform = 'translateX(-30px)';
                    contentImage.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                }
                
                if (contentText) {
                    contentText.style.opacity = '0';
                    contentText.style.transform = 'translateX(30px)';
                    contentText.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                }
            });
            
            const contentColumnsObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const contentImage = entry.target.querySelector('.content-image');
                        const contentText = entry.target.querySelector('.content-text');
                        
                        if (contentImage) {
                            contentImage.style.opacity = '1';
                            contentImage.style.transform = 'translateX(0)';
                        }
                        
                        if (contentText) {
                            contentText.style.opacity = '1';
                            contentText.style.transform = 'translateX(0)';
                        }
                    }
                });
            }, {
                threshold: 0.15
            });
            
            contentColumns.forEach(column => {
                contentColumnsObserver.observe(column);
            });
            
            // Search functionality
            const initSearch = () => {
                const searchInput = document.getElementById('searchInput');
                const searchBtn = document.getElementById('searchBtn');
                const searchSuggestions = document.getElementById('searchSuggestions');
                
                // Define searchable content with keywords and links
                const searchContent = [
                    // Main Pages
                    {
                        title: 'Home',
                        category: 'Page',
                        keywords: ['home', 'main', 'landing', 'social engineering', 'security'],
                        url: '../index.html'
                    },
                    {
                        title: 'Contact Us',
                        category: 'Page',
                        keywords: ['contact', 'email', 'support', 'help', 'reach out', 'get in touch'],
                        url: '../contact.html'
                    },
                    {
                        title: 'FAQ',
                        category: 'Page',
                        keywords: ['faq', 'questions', 'answers', 'help', 'frequently asked', 'support'],
                        url: '../company/faq.html'
                    },
                    // Services
                    {
                        title: 'Physical Security Consulting',
                        category: 'Service',
                        keywords: ['consulting', 'consultant', 'physical security', 'advisory'],
                        url: '../services/physical-security-consulting.html'
                    },
                    {
                        title: 'Security Audits',
                        category: 'Service',
                        keywords: ['audit', 'assessment', 'vulnerability', 'evaluation', 'risk', 'security assessment', 'compliance', 'incident response'],
                        url: '../services/security-audits.html'
                    },
                    {
                        title: 'Penetration Testing',
                        category: 'Service',
                        keywords: ['penetration testing', 'pen test', 'phishing', 'vishing', 'smishing', 'attack', 'simulation', 'physical access', 'social engineering', 'osint'],
                        url: '../services/penetration-testing.html'
                    },
                    {
                        title: 'Red Teaming',
                        category: 'Service',
                        keywords: ['red teaming', 'red team', 'adversary simulation', 'full spectrum', 'physical red team', 'intrusion simulation'],
                        url: '../services/red-teaming.html'
                    },
                    {
                        title: 'Corporate Counterintelligence',
                        category: 'Service',
                        keywords: ['counterintelligence', 'corporate espionage', 'trade secret', 'espionage protection', 'competitor'],
                        url: '../services/corporate-counterintelligence.html'
                    },
                    {
                        title: 'Insider Threat Programs',
                        category: 'Service',
                        keywords: ['insider threat', 'data exfiltration', 'employee theft', 'insider risk'],
                        url: '../services/insider-threat.html'
                    },
                    {
                        title: 'Security Awareness Training',
                        category: 'Service',
                        keywords: ['training', 'awareness', 'education', 'security training', 'employee training'],
                        url: '../services/security-training.html'
                    },
                    {
                        title: 'Workplace Violence Prevention',
                        category: 'Service',
                        keywords: ['workplace violence', 'violence prevention', 'active shooter', 'sb 553', 'threat assessment'],
                        url: '../services/workplace-violence-prevention.html'
                    },
                    {
                        title: 'Security Expert Witness',
                        category: 'Service',
                        keywords: ['expert witness', 'negligent security', 'premises liability', 'litigation', 'attorney'],
                        url: '../services/security-expert-witness.html'
                    },
                    // Company Pages
                    {
                        title: 'Company History',
                        category: 'Company',
                        keywords: ['about', 'company', 'history', 'red cell', 'legacy', 'background'],
                        url: '../company/company-history.html'
                    },
                    {
                        title: 'Mission & Values',
                        category: 'Company',
                        keywords: ['mission', 'values', 'purpose', 'principles', 'commitment', 'beliefs'],
                        url: '../company/mission-values.html'
                    },
                    {
                        title: 'Real-World Case Studies',
                        category: 'Company',
                        keywords: ['case studies', 'breaches', 'examples', 'business security', 'how to secure'],
                        url: '../company/how-to-secure-your-business.html'
                    },
                    {
                        title: 'Security Assessment Guide',
                        category: 'Company',
                        keywords: ['assessment', 'checklist', 'guide', 'risk assessment'],
                        url: '../company/physical-security-assessment-guide.html'
                    },
                    {
                        title: 'Why Hire a Security Consultant',
                        category: 'Company',
                        keywords: ['why hire', 'hiring', 'choose consultant'],
                        url: '../company/why-hire-a-physical-security-consultant.html'
                    },
                    // Active Industries
                    {
                        title: 'Healthcare Security',
                        category: 'Industry',
                        keywords: ['healthcare', 'health', 'medical', 'hospital', 'clinic', 'patient', 'hipaa'],
                        url: '../Industries/healthcare.html'
                    },
                    {
                        title: 'Law Firm Security',
                        category: 'Industry',
                        keywords: ['law', 'legal', 'attorney', 'lawyer', 'firm', 'confidential', 'ethics'],
                        url: '../Industries/law-firms.html'
                    },
                    {
                        title: 'Educational Institutions Security',
                        category: 'Industry',
                        keywords: ['education', 'school', 'university', 'college', 'academic', 'student'],
                        url: '../Industries/educational-institutions.html'
                    },
                    {
                        title: 'Financial Services Security',
                        category: 'Industry',
                        keywords: ['financial', 'finance', 'banking', 'investment', 'fintech', 'financial services'],
                        url: '../Industries/financial-services.html'
                    },
                    {
                        title: 'Houses of Worship Security',
                        category: 'Industry',
                        keywords: ['church', 'worship', 'congregation', 'ministry', 'faith'],
                        url: '../Industries/houses-of-worship.html'
                    },
                    {
                        title: 'Technology Industry Security',
                        category: 'Industry',
                        keywords: ['technology', 'tech', 'software', 'startup', 'ip theft', 'intellectual property'],
                        url: '../Industries/technology.html'
                    },
                    {
                        title: 'Biotech & Pharmaceutical Security',
                        category: 'Industry',
                        keywords: ['biotech', 'pharmaceutical', 'pharma', 'lab', 'laboratory', 'activist', 'research'],
                        url: '../Industries/biotech-pharmaceutical.html'
                    },
                    {
                        title: 'Manufacturing Security',
                        category: 'Industry',
                        keywords: ['manufacturing', 'plant', 'factory', 'industrial espionage', 'trade secret'],
                        url: '../Industries/manufacturing.html'
                    },
                    {
                        title: 'Construction Security',
                        category: 'Industry',
                        keywords: ['construction', 'job site', 'contractor', 'equipment theft'],
                        url: '../Industries/construction.html'
                    },
                    {
                        title: 'Data Center Security',
                        category: 'Industry',
                        keywords: ['data center', 'datacenter', 'server', 'colocation'],
                        url: '../Industries/data-centers.html'
                    },
                    // Locations
                    {
                        title: 'Miami Security Consulting',
                        category: 'Location',
                        keywords: ['miami', 'miami-dade', 'brickell', 'coral gables'],
                        url: 'miami.html'
                    },
                    {
                        title: 'Fort Lauderdale Security Consulting',
                        category: 'Location',
                        keywords: ['fort lauderdale', 'broward', 'coral springs'],
                        url: 'fort-lauderdale.html'
                    },
                    {
                        title: 'West Palm Beach Security Consulting',
                        category: 'Location',
                        keywords: ['west palm beach', 'palm beach', 'boca raton'],
                        url: 'west-palm-beach.html'
                    },
                    {
                        title: 'Orlando Security Consulting',
                        category: 'Location',
                        keywords: ['orlando', 'central florida'],
                        url: 'orlando.html'
                    },
                    // Solutions/Concepts
                    {
                        title: 'Enterprise Security',
                        category: 'Solution',
                        keywords: ['enterprise', 'business', 'corporate', 'company', 'organization'],
                        url: '../index.html#approach'
                    },
                    {
                        title: 'Human Firewall Program',
                        category: 'Solution',
                        keywords: ['human firewall', 'people', 'staff', 'personnel', 'employees'],
                        url: '../index.html#approach'
                    }
                ];
                
                // Function to search and display results
                const performSearch = (query) => {
                    // Clear previous suggestions
                    searchSuggestions.innerHTML = '';
                    
                    if (!query || query.length < 2) {
                        searchSuggestions.classList.remove('show');
                        return;
                    }
                    
                    const normalizedQuery = query.toLowerCase().trim();
                    const results = [];
                    
                    // Search in titles and keywords
                    searchContent.forEach(item => {
                        // Check title
                        if (item.title.toLowerCase().includes(normalizedQuery)) {
                            results.push(item);
                            return;
                        }
                        
                        // Check keywords
                        for (const keyword of item.keywords) {
                            if (keyword.toLowerCase().includes(normalizedQuery)) {
                                results.push(item);
                                return;
                            }
                        }
                    });
                    
                    // Display results
                    if (results.length > 0) {
                        results.forEach(result => {
                            const suggestionItem = document.createElement('div');
                            suggestionItem.className = 'search-suggestion-item';
                            suggestionItem.innerHTML = `
                                <span class="suggestion-title">${result.title}</span>
                                <span class="suggestion-category">${result.category}</span>
                            `;
                            suggestionItem.addEventListener('click', () => {
                                window.location.href = result.url;
                            });
                            searchSuggestions.appendChild(suggestionItem);
                        });
                        searchSuggestions.classList.add('show');
                    } else {
                        const noResults = document.createElement('div');
                        noResults.className = 'search-suggestion-item';
                        noResults.textContent = 'No results found';
                        searchSuggestions.appendChild(noResults);
                        searchSuggestions.classList.add('show');
                    }
                };
                
                // Search input event listeners
                if (searchInput) {
                    searchInput.addEventListener('focus', () => {
                        if (searchInput.value.length >= 2) {
                            performSearch(searchInput.value);
                        }
                    });
                    
                    let searchDebounceTimer;
                    searchInput.addEventListener('input', () => {
                        clearTimeout(searchDebounceTimer);
                        searchDebounceTimer = setTimeout(() => {
                            performSearch(searchInput.value);
                        }, 350);
                    });
                    
                    searchInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            
                            // If there's only one result, navigate to it
                            const suggestionItems = searchSuggestions.querySelectorAll('.search-suggestion-item');
                            if (suggestionItems.length === 1 && !suggestionItems[0].textContent.includes('No results found')) {
                                suggestionItems[0].click();
                            }
                        }
                    });
                }
                
                // Search button event listener
                if (searchBtn) {
                    searchBtn.addEventListener('click', () => {
                        performSearch(searchInput.value);
                    });
                }
                
                // Close suggestions when clicking outside
                document.addEventListener('click', (e) => {
                    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                        searchSuggestions.classList.remove('show');
                    }
                });
            };
            
            // Initialize search
            initSearch();

            // Add smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId !== '#') {
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                });
            });

            // Mobile menu toggle functionality
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const navLinks = document.querySelector('.nav-links');
            const body = document.body;
            
            // Toggle mobile menu
            mobileMenuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
                // Hide hamburger button when menu is active
                this.style.display = navLinks.classList.contains('active') ? 'none' : 'block';
            });
            
            // Handle dropdown menus on mobile
            const dropdownLinks = document.querySelectorAll('.nav-links .has-dropdown');
            
            // Store original hrefs and remove them on mobile
            const originalHrefs = new Map();
            
            function updateDropdownLinks() {
                dropdownLinks.forEach(link => {
                    // Always remove href for click-only behavior on all screen sizes
                    if (link.hasAttribute('href') && !originalHrefs.has(link)) {
                        originalHrefs.set(link, link.getAttribute('href'));
                        link.removeAttribute('href');
                        link.style.cursor = 'pointer';
                    }
                });
            }
            
            // Initial setup
            updateDropdownLinks();
            
            // Update on resize
            window.addEventListener('resize', updateDropdownLinks);
            
            dropdownLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    const parentLi = this.parentElement;
                    const wasOpen = parentLi.classList.contains('dropdown-open');
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.nav-links li').forEach(li => {
                        if (li !== parentLi) {
                            li.classList.remove('dropdown-open');
                        }
                    });
                    
                    // Toggle current dropdown
                    if (!wasOpen) {
                        parentLi.classList.add('dropdown-open');
                    } else {
                        parentLi.classList.remove('dropdown-open');
                    }
                    
                    // Prevent any navigation
                    return false;
                });
            });
            
            // Close mobile menu when clicking on a link
            const navLinksItems = document.querySelectorAll('.nav-links a:not(.has-dropdown)');
            navLinksItems.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        navLinks.classList.remove('active');
                        body.style.overflow = '';
                        // Show hamburger button again
                        mobileMenuToggle.style.display = 'block';
                    }
                });
            });
            
            // Close mobile menu when resizing to desktop
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    navLinks.classList.remove('active');
                    body.style.overflow = '';
                    document.querySelectorAll('.nav-links li').forEach(li => {
                        li.classList.remove('dropdown-open');
                    });
                    mobileMenuToggle.style.display = ''; // Reset display property
                } else {
                    // Ensure hamburger is visible on mobile if menu is not active
                    if (!navLinks.classList.contains('active')) {
                        mobileMenuToggle.style.display = 'block';
                    }
                }
            });
            
            // Handle clicks on mobile nav menu (including X button)
            navLinks.addEventListener('click', function(e) {
                if (window.innerWidth <= 768 && this.classList.contains('active')) {
                    const rect = this.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const clickY = e.clientY - rect.top;
                    
                    // Check if click is in the X button area (top-right corner)
                    if (clickX >= rect.width - 60 && clickX <= rect.width && clickY >= 0 && clickY <= 60) {
                        // Close menu when X is clicked
                        this.classList.remove('active');
                        body.style.overflow = '';
                        mobileMenuToggle.style.display = 'block';
                        
                        // Close any open dropdowns
                        document.querySelectorAll('.nav-links li').forEach(li => {
                            li.classList.remove('dropdown-open');
                        });
                    }
                }
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                    // Check if click is outside the menu and not on the toggle button
                    if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                        navLinks.classList.remove('active');
                        body.style.overflow = '';
                        mobileMenuToggle.style.display = 'block';
                    }
                }
                
                // Close all dropdowns when clicking outside
                if (!e.target.closest('.nav-links')) {
                    document.querySelectorAll('.nav-links li').forEach(li => {
                        li.classList.remove('dropdown-open');
                    });
                }
            });
            
            // Update sticky sidebar behavior for mobile
            const updateStickyNavigation = () => {
                const sidebar = document.querySelector('.sticky-sidebar');
                if (sidebar && window.innerWidth <= 768) {
                    // Remove any desktop-specific classes on mobile
                    sidebar.classList.remove('fixed');
                    sidebar.style.top = '';
                }
            };
            
            // Run on load and resize
            updateStickyNavigation();
            window.addEventListener('resize', updateStickyNavigation);
        });
    