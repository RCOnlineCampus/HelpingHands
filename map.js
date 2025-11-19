// ================= INTERACTIVE MAP WITH LEAFLET =================
// Shows both Helping Hands locations in Gqeberha (Port Elizabeth)

document.addEventListener('DOMContentLoaded', function() {
    // Check if map container exists
    const mapContainer = document.getElementById('location-map');
    if (!mapContainer) return;

    // Initialize map centered on Gqeberha (Port Elizabeth)
    const map = L.map('location-map').setView([-33.9608, 25.6022], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    // Define your two locations
    const locations = [
        {
            name: 'Central Distribution Hub',
            coords: [-33.9608, 25.6022], // Central PE
            address: '123 Church Street, Central, Port Elizabeth, 6001',
            hours: '<strong>Mon-Fri:</strong> 9:00 AM - 4:00 PM<br><strong>Thursdays:</strong> Meal Distribution 5:00 PM - 7:00 PM<br><strong>First Saturday:</strong> Clothing Distribution 10:00 AM - 2:00 PM',
            services: 'Meal Distribution, Clothing Bank, Skills Workshops',
            phone: '(041) 555-0123',
            color: '#27ae60'
        },
        {
            name: 'Township Community Center',
            coords: [-33.9808, 25.6322], // New Brighton area
            address: '45 Mandela Avenue, New Brighton, Port Elizabeth, 6205',
            hours: '<strong>Thursdays:</strong> Meal Distribution 5:00 PM - 7:00 PM<br><strong>Second Saturday:</strong> Skills Workshops 9:00 AM - 12:00 PM',
            services: 'Meal Distribution, Emergency Food Parcels, Educational Support',
            phone: '(041) 555-0123',
            color: '#3498db'
        }
    ];

    // Custom marker icon function
    function createCustomIcon(color) {
        return L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background-color: ${color};
                width: 32px;
                height: 32px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.4);
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <div style="
                    width: 12px;
                    height: 12px;
                    background: white;
                    border-radius: 50%;
                    transform: rotate(45deg);
                "></div>
            </div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
    }

    // Add markers for each location
    locations.forEach(location => {
        const marker = L.marker(location.coords, {
            icon: createCustomIcon(location.color)
        }).addTo(map);

        // Create detailed popup content
        const popupContent = `
            <div style="min-width: 280px; font-family: 'Roboto', sans-serif; line-height: 1.6;">
                <h3 style="color: ${location.color}; margin: 0 0 0.8rem 0; font-size: 1.3rem; border-bottom: 2px solid ${location.color}; padding-bottom: 0.5rem;">
                    📍 ${location.name}
                </h3>
                
                <div style="margin-bottom: 0.8rem;">
                    <strong style="color: #2c3e50;">Address:</strong><br>
                    <span style="color: #555;">${location.address}</span>
                </div>
                
                <div style="margin-bottom: 0.8rem;">
                    <strong style="color: #2c3e50;">Hours:</strong><br>
                    <span style="color: #555; font-size: 0.9rem;">${location.hours}</span>
                </div>
                
                <div style="margin-bottom: 0.8rem;">
                    <strong style="color: #2c3e50;">Services:</strong><br>
                    <span style="color: #555;">${location.services}</span>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <strong style="color: #2c3e50;">Phone:</strong> 
                    <a href="tel:${location.phone.replace(/[\s()-]/g, '')}" style="color: ${location.color}; text-decoration: none; font-weight: bold;">
                        ${location.phone}
                    </a>
                </div>
                
                <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${location.coords[0]},${location.coords[1]}" 
                       target="_blank"
                       style="flex: 1; background: ${location.color}; color: white; padding: 0.6rem; text-align: center; text-decoration: none; border-radius: 5px; font-size: 0.9rem; transition: opacity 0.3s;"
                       onmouseover="this.style.opacity='0.8'"
                       onmouseout="this.style.opacity='1'">
                        🗺️ Get Directions
                    </a>
                    <a href="tel:${location.phone.replace(/[\s()-]/g, '')}" 
                       style="flex: 1; background: #34495e; color: white; padding: 0.6rem; text-align: center; text-decoration: none; border-radius: 5px; font-size: 0.9rem; transition: opacity 0.3s;"
                       onmouseover="this.style.opacity='0.8'"
                       onmouseout="this.style.opacity='1'">
                        📞 Call Now
                    </a>
                </div>
            </div>
        `;

        marker.bindPopup(popupContent, {
            maxWidth: 320,
            className: 'custom-popup'
        });

        // Open popup on hover (optional)
        marker.on('mouseover', function() {
            this.openPopup();
        });
    });

    // Fit map to show both locations
    const group = L.featureGroup(locations.map(loc => L.marker(loc.coords)));
    map.fitBounds(group.getBounds().pad(0.3));

    // Add custom CSS for popups
    const style = document.createElement('style');
    style.textContent = `
        .leaflet-popup-content-wrapper {
            border-radius: 8px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        .leaflet-popup-content {
            margin: 1rem;
        }
        .leaflet-popup-tip {
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        }
        .custom-marker {
            background: transparent;
            border: none;
        }
    `;
    document.head.appendChild(style);
});