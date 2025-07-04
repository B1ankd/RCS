// RCS Security - Mobile Menu JavaScript
// This script handles mobile navigation functionality across all pages

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileMenuToggle && navLinks) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Handle dropdown menus on mobile
        const dropdownLinks = document.querySelectorAll('.nav-links .has-dropdown');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parentLi = this.parentElement;
                    const wasOpen = parentLi.classList.contains('dropdown-open');
                    
                    // Close all dropdowns
                    document.querySelectorAll('.nav-links li').forEach(li => {
                        li.classList.remove('dropdown-open');
                    });
                    
                    // Toggle current dropdown
                    if (!wasOpen) {
                        parentLi.classList.add('dropdown-open');
                    }
                }
            });
        });
        
        // Close mobile menu when clicking on a link
        const navLinksItems = document.querySelectorAll('.nav-links a:not(.has-dropdown)');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    body.style.overflow = '';
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
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    navLinks.classList.remove('active');
                    body.style.overflow = '';
                }
            }
        });
    }
    
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