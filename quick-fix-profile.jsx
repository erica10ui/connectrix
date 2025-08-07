import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchProfile = async () => {
      try {
        console.log('Fetching profile for user:', currentUser.uid);
        
        // Get profile from 'profiles' collection
        const profileRef = doc(db, "profiles", currentUser.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          const profileData = profileSnap.data();
          console.log('✅ Profile data found:', profileData);
          setProfile(profileData);
        } else {
          console.log('❌ Profile not found in profiles collection');
          // Create basic profile data
          const basicProfile = {
            fullName: currentUser.displayName || currentUser.email || "User",
            email: currentUser.email,
            role: "alumni",
            avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
            banner: null,
            currentWork: "",
            location: "",
            degree: "",
            skills: [],
            bio: ""
          };
          console.log('📝 Using basic profile:', basicProfile);
          setProfile(basicProfile);
        }
      } catch (error) {
        console.error('❌ Error fetching profile:', error);
        // Set fallback profile
        setProfile({
          fullName: "User",
          email: currentUser.email,
          role: "alumni",
          avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
          banner: null,
          currentWork: "",
          location: "",
          degree: "",
          skills: [],
          bio: ""
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [currentUser]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        fontSize: '18px',
        color: '#d32f2f'
      }}>
        Profile not found
      </div>
    );
  }

  console.log('🎯 Rendering profile with data:', profile);

  return (
    <div style={{
      maxWidth: 900,
      margin: "32px auto",
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
      overflow: "hidden",
    }}>
      {/* Banner - Always show something */}
      <div style={{ 
        height: 160, 
        backgroundSize: "cover", 
        backgroundImage: profile.banner ? `url(${profile.banner})` : undefined,
        backgroundColor: "#e3f2fd",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#1976d2",
        fontSize: "18px",
        fontWeight: "bold"
      }}>
        {profile.banner ? "Profile Banner" : "No Banner Set"}
      </div>

      {/* Profile Avatar */}
      <div style={{ textAlign: "center", marginTop: -64 }}>
        <img
          src={profile.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"}
          alt="Avatar"
          style={{ 
            width: 128, 
            height: 128, 
            borderRadius: "50%", 
            border: "4px solid white", 
            background: "#fff",
            objectFit: "cover"
          }}
          onError={(e) => {
            e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg";
          }}
        />
        <h2 style={{ margin: "16px 0 4px" }}>
          {profile.fullName || profile.name || "User"}
        </h2>
        <p style={{ color: "#777" }}>
          {profile.currentWork || "No work info"}
        </p>
      </div>

      {/* Profile Details */}
      <div style={{ padding: 24 }}>
        <h3 style={{ margin: "0 0 16px 0", color: "#1976d2" }}>Profile Information</h3>
        
        <div style={{ marginBottom: 12 }}>
          <strong>Email:</strong> {profile.email || "No email"}
        </div>
        
        <div style={{ marginBottom: 12 }}>
          <strong>Role:</strong> {profile.role || "No role"}
        </div>
        
        <div style={{ marginBottom: 12 }}>
          <strong>Current Work:</strong> {profile.currentWork || "Not specified"}
        </div>
        
        <div style={{ marginBottom: 12 }}>
          <strong>Location:</strong> {profile.location || "Not specified"}
        </div>
        
        <div style={{ marginBottom: 12 }}>
          <strong>Degree:</strong> {profile.degree || "Not specified"}
        </div>
        
        <div style={{ marginBottom: 12 }}>
          <strong>Bio:</strong> {profile.bio || "No bio yet"}
        </div>

        {profile.skills && profile.skills.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <strong>Skills:</strong>
            <div style={{ marginTop: 8 }}>
              {profile.skills.map((skill, index) => (
                <span key={index} style={{
                  background: "#e3f2fd",
                  color: "#1976d2",
                  borderRadius: 16,
                  padding: "4px 14px",
                  fontSize: 14,
                  fontWeight: 500,
                  display: "inline-block",
                  margin: "2px 4px"
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 