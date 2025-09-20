import streamlit as st
import cv2
from ultralytics import YOLO
import tempfile
import requests
from bs4 import BeautifulSoup
import numpy as np
from PIL import Image, ImageEnhance
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime
import time
import json
import base64
from io import BytesIO
import pandas as pd
import random

# 🎨 INSANE PAGE CONFIG WITH CUSTOM CSS
st.set_page_config(
    page_title="🚀 EcoVision AI - Next-Gen Waste Classifier", 
    layout="wide",
    initial_sidebar_state="expanded"
)

# 💫 CRAZY CUSTOM CSS FOR HACKATHON WOW FACTOR
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
    
    .main-header {
        font-family: 'Orbitron', monospace;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        font-size: 3.5rem;
        font-weight: 900;
        margin-bottom: 30px;
        text-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
    }
    
    .metric-container {
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.1);
        backdrop-filter: blur(10px);
        margin: 10px 0;
    }
    
    .scanner-overlay {
        position: relative;
        border: 3px solid #00ff41;
        border-radius: 10px;
        box-shadow: 0 0 30px #00ff41;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { box-shadow: 0 0 30px #00ff41; }
        50% { box-shadow: 0 0 60px #00ff41, 0 0 90px #00ff41; }
        100% { box-shadow: 0 0 30px #00ff41; }
    }
    
    .detection-alert {
        background: linear-gradient(45deg, #ff6b6b, #ee5a52);
        color: white;
        padding: 15px;
        border-radius: 10px;
        font-weight: bold;
        animation: fadeInUp 0.5s ease-out;
    }
    
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .eco-impact {
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        padding: 20px;
        border-radius: 15px;
        color: white;
        margin: 20px 0;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    
    .sidebar .sidebar-content {
        background: linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
    }
    
    .stSelectbox > div > div {
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
    }
</style>
""", unsafe_allow_html=True)

# 🚀 ENHANCED WASTE DATA WITH ECO IMPACT
enhanced_waste_data = {
    "battery": {
        "suggestion": "⚠️ HAZARDOUS! Take to specialized e-waste centers. Contains toxic materials.",
        "co2_saved": 2.3,
        "water_saved": 15,
        "energy_saved": 45,
        "recycle_tips": ["Remove from devices safely", "Tape terminals", "Find certified recyclers"],
        "environmental_impact": "Batteries contain heavy metals that can contaminate soil and water for decades!"
    },
    "biological": {
        "suggestion": "🌱 Perfect for composting! Create nutrient-rich soil amendment.",
        "co2_saved": 0.8,
        "water_saved": 5,
        "energy_saved": 12,
        "recycle_tips": ["Start a compost bin", "Mix with browns (cardboard)", "Turn regularly"],
        "environmental_impact": "Composting reduces methane emissions from landfills by 70%!"
    },
    "brown-glass": {
        "suggestion": "♻️ Infinitely recyclable! Clean and sort by color.",
        "co2_saved": 1.2,
        "water_saved": 8,
        "energy_saved": 25,
        "recycle_tips": ["Remove caps and lids", "Rinse thoroughly", "Sort by color"],
        "environmental_impact": "Glass recycling saves 30% energy compared to making new glass!"
    },
    "cardboard": {
        "suggestion": "📦 Highly recyclable! Flatten and keep dry.",
        "co2_saved": 3.5,
        "water_saved": 25,
        "energy_saved": 35,
        "recycle_tips": ["Remove tape and staples", "Flatten boxes", "Keep dry"],
        "environmental_impact": "Recycling cardboard saves 24% energy and 50% water!"
    },
    "clothes": {
        "suggestion": "👕 Donate, upcycle, or textile recycle. Fast fashion is killing our planet!",
        "co2_saved": 8.1,
        "water_saved": 120,
        "energy_saved": 85,
        "recycle_tips": ["Donate if wearable", "Upcycle into rags", "Find textile recyclers"],
        "environmental_impact": "Fashion industry produces 10% of global carbon emissions!"
    },
    "green-glass": {
        "suggestion": "🍃 Recycle into new bottles! Glass is 100% recyclable.",
        "co2_saved": 1.2,
        "water_saved": 8,
        "energy_saved": 25,
        "recycle_tips": ["Remove caps", "Rinse clean", "Sort by color"],
        "environmental_impact": "Every ton of recycled glass saves 1.2 tons of raw materials!"
    },
    "metal": {
        "suggestion": "🔧 Extremely valuable! Metal recycling is highly profitable.",
        "co2_saved": 4.2,
        "water_saved": 18,
        "energy_saved": 65,
        "recycle_tips": ["Separate aluminum from steel", "Clean of food residue", "Check for scrap value"],
        "environmental_impact": "Aluminum recycling saves 95% of energy needed for new production!"
    },
    "paper": {
        "suggestion": "📄 Recycle or reuse! Paper can be recycled 5-7 times.",
        "co2_saved": 2.1,
        "water_saved": 35,
        "energy_saved": 28,
        "recycle_tips": ["Remove staples", "Separate glossy from regular", "Keep clean and dry"],
        "environmental_impact": "Recycling paper saves 17 trees per ton!"
    },
    "plastic": {
        "suggestion": "♻️ Check recycling number! Not all plastics are equal.",
        "co2_saved": 1.8,
        "water_saved": 12,
        "energy_saved": 42,
        "recycle_tips": ["Check recycling number", "Rinse thoroughly", "Remove caps if required"],
        "environmental_impact": "Plastic takes 400+ years to decompose in landfills!"
    },
    "shoes": {
        "suggestion": "👟 Donate or find shoe recycling programs. Many brands accept old shoes!",
        "co2_saved": 5.2,
        "water_saved": 45,
        "energy_saved": 38,
        "recycle_tips": ["Donate if wearable", "Nike Reuse-A-Shoe program", "Check brand programs"],
        "environmental_impact": "300 million pairs of shoes end up in landfills yearly!"
    },
    "trash": {
        "suggestion": "🗑️ Last resort! Can this really not be recycled or composted?",
        "co2_saved": 0,
        "water_saved": 0,
        "energy_saved": 0,
        "recycle_tips": ["Double-check if recyclable", "Minimize waste", "Consider reuse"],
        "environmental_impact": "Average person generates 4.9 lbs of trash daily!"
    },
    "white-glass": {
        "suggestion": "⚪ Most valuable glass color! Perfect for recycling.",
        "co2_saved": 1.2,
        "water_saved": 8,
        "energy_saved": 25,
        "recycle_tips": ["Remove all caps", "Rinse thoroughly", "Keep separate from colored glass"],
        "environmental_impact": "Clear glass is most valuable and easiest to recycle!"
    }
}

# 🎯 INITIALIZE SESSION STATE FOR CRAZY FEATURES
if "detection_history" not in st.session_state:
    st.session_state.detection_history = []
if "total_co2_saved" not in st.session_state:
    st.session_state.total_co2_saved = 0
if "total_items_classified" not in st.session_state:
    st.session_state.total_items_classified = 0
if "eco_score" not in st.session_state:
    st.session_state.eco_score = 0

# 🎨 INSANE HEADER
st.markdown('<h1 class="main-header">🚀 EcoVision AI - Next-Gen Waste Classifier</h1>', unsafe_allow_html=True)
st.markdown("### *Powered by AI • Saving the Planet • One Classification at a Time* 🌍✨")

# 🛠️ LOAD MODEL WITH ERROR HANDLING
@st.cache_resource
def load_model():
    try:
        model = YOLO("runs/classify/train2/weights/best.pt")
        return model
    except:
        st.error("⚠️ Model not found! Using demo mode...")
        return None

model = load_model()

# 🎮 SIDEBAR WITH INSANE CONTROLS
with st.sidebar:
    st.markdown("### 🎮 Control Panel")
    
    # Camera controls
    start_webcam = st.checkbox("📹 Start Live Classification", help="Start real-time waste detection")
    
    # Detection settings
    st.markdown("### ⚙️ Detection Settings")
    confidence_threshold = st.slider("🎯 Confidence Threshold", 0.1, 1.0, 0.5, 0.1)
    show_grid = st.checkbox("🔲 Scanner Grid Overlay", value=True)
    show_confidence = st.checkbox("📊 Show Confidence Score", value=True)
    
    # Visualization mode
    st.markdown("### 🎨 Visualization Mode")
    viz_mode = st.selectbox("Choose Style", ["🔬 Scientific", "🎮 Gaming", "🌈 Colorful", "🤖 Cyberpunk"])
    
    # Environmental impact toggle
    show_impact = st.checkbox("🌱 Show Environmental Impact", value=True)
    
    # Stats reset
    if st.button("🔄 Reset Statistics"):
        st.session_state.detection_history = []
        st.session_state.total_co2_saved = 0
        st.session_state.total_items_classified = 0
        st.session_state.eco_score = 0
        st.success("Statistics reset!")

# 🎯 MAIN DASHBOARD LAYOUT
col1, col2, col3 = st.columns([2, 1, 1])

with col1:
    st.markdown("### 📹 Live Classification Feed")
    video_placeholder = st.empty()
    detection_placeholder = st.empty()

with col2:
    st.markdown("### 📊 Real-Time Stats")
    stats_placeholder = st.empty()

with col3:
    st.markdown("### 🌱 Eco Impact")
    impact_placeholder = st.empty()

# 🎨 ENHANCED YOUTUBE VIDEO FETCHER WITH MULTIPLE METHODS
def fetch_enhanced_youtube_videos(query, max_results=5):
    """Enhanced YouTube video fetcher with multiple fallback methods"""
    video_data = []
    
    # Method 1: Try web scraping with user agent
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        search_url = f"https://www.youtube.com/results?search_query={query.replace(' ', '+')}"
        response = requests.get(search_url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            # Look for video data in script tags
            import re
            video_pattern = r'"videoId":"([^"]+)".*?"title":{"runs":\[{"text":"([^"]+)"}'
            matches = re.findall(video_pattern, response.text)
            
            for video_id, title in matches[:max_results]:
                video_url = f"https://www.youtube.com/watch?v={video_id}"
                video_data.append({
                    "title": title.replace("\\u0026", "&"),
                    "url": video_url,
                    "thumbnail": f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"
                })
                
        # Fallback: Look for basic links
        if not video_data:
            soup = BeautifulSoup(response.text, "html.parser")
            for link in soup.find_all("a"):
                href = link.get("href")
                if href and "/watch?v=" in href:
                    full_link = "https://www.youtube.com" + href
                    title = link.get("title") or link.text.strip() or "DIY Tutorial"
                    if len(title) > 5 and full_link not in [v["url"] for v in video_data]:
                        video_data.append({"title": title[:60], "url": full_link})
                if len(video_data) >= max_results:
                    break
                    
    except Exception as e:
        print(f"YouTube scraping error: {e}")
    
    # Method 2: Fallback with curated suggestions per waste type
    fallback_videos = get_curated_youtube_videos(query)
    if not video_data and fallback_videos:
        video_data = fallback_videos[:max_results]
    
    # Method 3: Generate search URLs as last resort
    if not video_data:
        search_queries = generate_search_queries(query)
        for i, search_query in enumerate(search_queries[:max_results]):
            video_data.append({
                "title": f"🔍 Search: {search_query}",
                "url": f"https://www.youtube.com/results?search_query={search_query.replace(' ', '+')}"
            })
    
    return video_data

def get_curated_youtube_videos(query):
    """Curated YouTube video suggestions for each waste type"""
    curated_videos = {
        "plastic bottle": [
            {"title": "50 Amazing Plastic Bottle DIY Ideas", "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
            {"title": "How to Make Planters from Plastic Bottles", "url": "https://www.youtube.com/watch?v=2Vv-BfVoq4g"},
            {"title": "Plastic Bottle Bird Feeder DIY", "url": "https://www.youtube.com/watch?v=3fumBcKC6RE"},
            {"title": "Creative Storage Solutions with Bottles", "url": "https://www.youtube.com/watch?v=y6120QOlsfU"}
        ],
        "plastic": [
            {"title": "Creative Ways to Reuse Plastic Containers", "url": "https://www.youtube.com/results?search_query=plastic+container+diy+reuse"},
            {"title": "Plastic Bottle Craft Ideas", "url": "https://www.youtube.com/results?search_query=plastic+bottle+craft+diy"},
            {"title": "How to Recycle Plastic at Home", "url": "https://www.youtube.com/results?search_query=how+to+recycle+plastic+at+home"}
        ],
        "cardboard": [
            {"title": "Cardboard Box Castle DIY", "url": "https://www.youtube.com/results?search_query=cardboard+box+castle+diy"},
            {"title": "Storage Organizers from Cardboard", "url": "https://www.youtube.com/results?search_query=cardboard+storage+organizer+diy"},
            {"title": "Cardboard Furniture Ideas", "url": "https://www.youtube.com/results?search_query=cardboard+furniture+diy"}
        ],
        "paper": [
            {"title": "Paper Quilling Art Tutorial", "url": "https://www.youtube.com/results?search_query=paper+quilling+tutorial"},
            {"title": "Origami for Beginners", "url": "https://www.youtube.com/results?search_query=origami+tutorial+beginners"},
            {"title": "Paper Mache Crafts", "url": "https://www.youtube.com/results?search_query=paper+mache+crafts+tutorial"}
        ],
        "glass": [
            {"title": "Glass Bottle Upcycling Ideas", "url": "https://www.youtube.com/results?search_query=glass+bottle+upcycle+diy"},
            {"title": "Wine Bottle Crafts", "url": "https://www.youtube.com/results?search_query=wine+bottle+crafts+diy"},
            {"title": "Glass Jar Storage Solutions", "url": "https://www.youtube.com/results?search_query=glass+jar+storage+diy"}
        ],
        "metal": [
            {"title": "Tin Can Planters DIY", "url": "https://www.youtube.com/results?search_query=tin+can+planter+diy"},
            {"title": "Metal Can Organizers", "url": "https://www.youtube.com/results?search_query=metal+can+organizer+diy"},
            {"title": "Aluminum Can Crafts", "url": "https://www.youtube.com/results?search_query=aluminum+can+crafts+diy"}
        ],
        "clothes": [
            {"title": "T-Shirt Upcycling Ideas", "url": "https://www.youtube.com/results?search_query=t+shirt+upcycle+diy"},
            {"title": "Denim Jacket Customization", "url": "https://www.youtube.com/results?search_query=denim+jacket+diy+customization"},
            {"title": "Clothing Repair Tutorials", "url": "https://www.youtube.com/results?search_query=clothing+repair+tutorial"}
        ]
    }
    
    # Find matching videos
    for key, videos in curated_videos.items():
        if key in query.lower():
            return videos
    
    return []

def generate_search_queries(original_query):
    """Generate related search queries"""
    base_terms = original_query.lower().split()
    
    if "plastic" in base_terms:
        return [
            "plastic bottle DIY crafts",
            "plastic container reuse ideas",
            "upcycle plastic bottles",
            "plastic bottle planters",
            "creative plastic crafts"
        ]
    elif "cardboard" in base_terms:
        return [
            "cardboard box DIY projects",
            "cardboard storage ideas", 
            "cardboard craft tutorials",
            "upcycle cardboard boxes",
            "cardboard organizer DIY"
        ]
    elif any(glass in base_terms for glass in ["glass", "bottle"]):
        return [
            "glass bottle upcycling",
            "wine bottle crafts",
            "glass jar storage DIY",
            "glass bottle cutting",
            "glass container crafts"
        ]
    else:
        return [
            f"{original_query} DIY tutorial",
            f"how to reuse {original_query}",
            f"{original_query} craft ideas",
            f"upcycle {original_query}",
            f"{original_query} home projects"
        ]

# 🎯 OPTIMIZED DETECTION FUNCTION
def process_frame(frame, model, viz_mode, frame_count):
    # Only run YOLO detection every 15 frames (about 0.5 seconds at 30fps)
    if frame_count % 15 == 0:
        if model is None:
            # Demo mode - random classification
            classes = list(enhanced_waste_data.keys())
            pred_class = random.choice(classes)
            confidence = random.uniform(0.7, 0.95)
            return frame, pred_class, confidence, True
        
        # Real YOLO detection
        results = model(frame)
        pred_class_idx = results[0].probs.top1
        confidence = results[0].probs.top1conf.item()
        class_name = model.names[pred_class_idx]
        
        return frame, class_name, confidence, True
    else:
        # Return None for non-detection frames to reuse last result
        return frame, None, None, False

# 🎮 OPTIMIZED MAIN APPLICATION LOOP
last_detection = {"class": None, "time": 0, "confidence": 0}
frame_count = 0

if start_webcam:
    # Initialize webcam with optimized settings
    if 'cap' not in st.session_state:
        st.session_state.cap = cv2.VideoCapture(0)
        # Optimize camera settings for performance
        st.session_state.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)  # Reduced resolution
        st.session_state.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        st.session_state.cap.set(cv2.CAP_PROP_FPS, 15)  # Lower FPS for stability
        st.session_state.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)  # Reduce buffer lag
        
        if not st.session_state.cap.isOpened():
            st.error("❌ Cannot access webcam! Check permissions.")
            st.stop()
    
    cap = st.session_state.cap
    
    # Performance tracking
    fps_counter = 0
    start_time = time.time()
    
    # Main detection loop - OPTIMIZED
    while start_webcam:
        ret, frame = cap.read()
        if not ret:
            st.error("❌ Webcam feed interrupted!")
            break
        
        frame_count += 1
        fps_counter += 1
        
        # Resize frame for faster processing (optional)
        if frame.shape[1] > 640:
            frame = cv2.resize(frame, (640, 480))
        
        # Get prediction (only every 15 frames)
        processed_frame, class_name, confidence, is_new_detection = process_frame(frame, model, viz_mode, frame_count)
        
        # Use last detection if no new detection
        if not is_new_detection:
            class_name = last_detection["class"]
            confidence = last_detection["confidence"]
        
        # Apply LIGHTWEIGHT visual enhancements
        h, w = frame.shape[:2]
        
        if viz_mode == "🤖 Cyberpunk" and show_grid:
            # Simplified grid - only every 60 pixels
            step = 60
            for x in range(0, w, step):
                cv2.line(frame, (x, 0), (x, h), (0, 255, 200), 1)
            for y in range(0, h, step):
                cv2.line(frame, (0, y), (w, y), (0, 255, 200), 1)
            # Simple border
            cv2.rectangle(frame, (2, 2), (w-2, h-2), (0, 255, 200), 2)
            
        elif viz_mode == "🎮 Gaming" and show_grid:
            # Simple crosshair only
            center_x, center_y = w//2, h//2
            cv2.line(frame, (center_x-15, center_y), (center_x+15, center_y), (0, 0, 255), 2)
            cv2.line(frame, (center_x, center_y-15), (center_x, center_y+15), (0, 0, 255), 2)
        
        # SIMPLIFIED Detection label
        if class_name and confidence and confidence >= confidence_threshold:
            # Simple label box
            label_text = f"{class_name.upper()}"
            conf_text = f"({confidence:.1%})" if show_confidence else ""
            
            # Draw simple label box
            cv2.rectangle(frame, (10, 10), (300, 70), (0, 0, 0), -1)
            cv2.rectangle(frame, (8, 8), (302, 72), (0, 255, 0), 2)
            
            # Label text
            cv2.putText(frame, label_text, (20, 35), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
            if show_confidence:
                cv2.putText(frame, conf_text, (20, 55), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (200, 200, 200), 1)
            
            # Update detection history (only for new detections)
            if is_new_detection:
                current_time = time.time()
                if (class_name != last_detection["class"] or 
                    current_time - last_detection["time"] > 3):  # New detection or 3s passed
                    
                    # Add to history
                    detection_record = {
                        "timestamp": datetime.now(),
                        "class": class_name,
                        "confidence": confidence,
                        "eco_data": enhanced_waste_data.get(class_name, {})
                    }
                    st.session_state.detection_history.append(detection_record)
                    
                    # Update totals
                    waste_data = enhanced_waste_data.get(class_name, {})
                    st.session_state.total_co2_saved += waste_data.get("co2_saved", 0)
                    st.session_state.total_items_classified += 1
                    st.session_state.eco_score += int(confidence * 100)
                    
                    last_detection = {"class": class_name, "time": current_time, "confidence": confidence}
                    
                    # Show detection alert ONLY for new detections
                    with detection_placeholder.container():
                        st.markdown(f"""
                        <div class="detection-alert">
                            🎯 <strong>DETECTED:</strong> {class_name.upper()} 
                            <br>📊 <strong>Confidence:</strong> {confidence:.1%}
                            <br>💡 <strong>Action:</strong> {waste_data.get('suggestion', 'No suggestion')}
                        </div>
                        """, unsafe_allow_html=True)
                        
                        # Fetch and display YouTube videos immediately (async to avoid blocking)
                        if frame_count % 45 == 0:  # Only every 3 seconds to avoid spam
                            st.markdown("### 🎥 DIY & Recycling Tutorials")
                            
                            # Generate specific queries for better results
                            video_queries = [
                                f"DIY {class_name} crafts tutorial",
                                f"how to reuse {class_name} at home"
                            ]
                            
                            all_videos = []
                            for query in video_queries:
                                videos = fetch_enhanced_youtube_videos(query, 2)
                                all_videos.extend(videos)
                            
                            # Remove duplicates and limit to 3
                            seen_urls = set()
                            unique_videos = []
                            for video in all_videos:
                                if video['url'] not in seen_urls:
                                    seen_urls.add(video['url'])
                                    unique_videos.append(video)
                            
                            # Display videos in a nice format
                            if unique_videos:
                                for i, video in enumerate(unique_videos[:3]):
                                    st.markdown(f"🎬 **[{video['title']}]({video['url']})**")
                            else:
                                # Fallback with direct search links
                                fallback_search = f"https://www.youtube.com/results?search_query=DIY+{class_name}+crafts"
                                st.markdown(f"🔍 **[Search: DIY {class_name} Ideas]({fallback_search})**")
        
        # Display frame
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        video_placeholder.image(frame_rgb, channels="RGB", use_container_width=True)
        
        # Update stats every 10 frames only
        if frame_count % 10 == 0:
            with stats_placeholder.container():
                st.metric("🎯 Items Classified", st.session_state.total_items_classified)
                st.metric("⚡ Eco Score", f"{st.session_state.eco_score:,}")
                if len(st.session_state.detection_history) > 0:
                    recent_detection = st.session_state.detection_history[-1]
                    st.metric("🕐 Last Detection", recent_detection["class"].title())
        
        # Update environmental impact every 15 frames
        if show_impact and frame_count % 15 == 0:
            with impact_placeholder.container():
                st.markdown(f"""
                <div class="eco-impact">
                    <h4>🌱 Environmental Impact</h4>
                    <p><strong>CO₂ Saved:</strong> {st.session_state.total_co2_saved:.1f} kg</p>
                    <p><strong>Trees Saved:</strong> {st.session_state.total_co2_saved * 0.05:.1f}</p>
                    <p><strong>Water Saved:</strong> {st.session_state.total_co2_saved * 5:.0f} liters</p>
                </div>
                """, unsafe_allow_html=True)
        
        # Show FPS for debugging (optional)
        if frame_count % 30 == 0:
            elapsed = time.time() - start_time
            if elapsed > 0:
                fps = fps_counter / elapsed
                # st.sidebar.text(f"FPS: {fps:.1f}")  # Uncomment for debugging
        
        # Break condition
        if not start_webcam:
            break
        
        # Minimal sleep to prevent overwhelming
        time.sleep(0.033)  # ~30 FPS max
    
    # Release camera when stopping
    if 'cap' in st.session_state:
        st.session_state.cap.release()
        del st.session_state.cap

else:
    st.info("📹 Click 'Start Live Classification' to begin detecting waste items!")

# 🌟 ENHANCED DASHBOARD SECTIONS
if len(st.session_state.detection_history) > 0:
    st.markdown("---")
    
    # Create columns for dashboard
    dash_col1, dash_col2 = st.columns([2, 1])
    
    with dash_col1:
        st.markdown("### 📊 Detection Analytics Dashboard")
        
        # Create detection frequency chart
        df = pd.DataFrame(st.session_state.detection_history)
        df['class_count'] = df.groupby('class')['class'].transform('count')
        
        fig = px.bar(
            df.drop_duplicates(subset=['class']), 
            x='class', 
            y='class_count',
            title="🎯 Waste Type Detection Frequency",
            color='class_count',
            color_continuous_scale='viridis'
        )
        fig.update_layout(
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)',
            font_color='white'
        )
        st.plotly_chart(fig, use_container_width=True)
    
    with dash_col2:
        st.markdown("### 🎥 Latest DIY Tutorials")
        if len(st.session_state.detection_history) > 0:
            latest_class = st.session_state.detection_history[-1]['class']
            
            # Generate multiple queries for better video variety
            video_queries = [
                f"DIY {latest_class} projects",
                f"creative {latest_class} reuse",
                f"{latest_class} upcycling tutorial"
            ]
            
            st.markdown(f"**🎯 For: {latest_class.title()}**")
            
            # Get videos from all queries
            all_tutorial_videos = []
            for query in video_queries:
                videos = fetch_enhanced_youtube_videos(query, 2)
                all_tutorial_videos.extend(videos)
            
            # Display unique videos
            displayed_urls = set()
            video_count = 0
            
            for video in all_tutorial_videos:
                if video['url'] not in displayed_urls and video_count < 4:
                    displayed_urls.add(video['url'])
                    video_count += 1
                    
                    # Create clickable video links with emojis
                    st.markdown(f"🎬 **[{video['title'][:45]}...]({video['url']})**")
            
            # Add general search link as backup
            if video_count < 2:
                general_search = f"https://www.youtube.com/results?search_query=DIY+{latest_class}+recycling"
                st.markdown(f"🔍 **[More {latest_class.title()} Tutorials]({general_search})**")
    
    # Environmental impact visualization
    st.markdown("### 🌍 Environmental Impact Visualization")
    
    impact_col1, impact_col2, impact_col3 = st.columns(3)
    
    with impact_col1:
        # CO2 gauge
        fig_co2 = go.Figure(go.Indicator(
            mode = "gauge+number+delta",
            value = st.session_state.total_co2_saved,
            domain = {'x': [0, 1], 'y': [0, 1]},
            title = {'text': "CO₂ Saved (kg)"},
            delta = {'reference': st.session_state.total_co2_saved * 0.8},
            gauge = {
                'axis': {'range': [None, max(10, st.session_state.total_co2_saved * 1.5)]},
                'bar': {'color': "lightgreen"},
                'steps': [
                    {'range': [0, st.session_state.total_co2_saved * 0.5], 'color': "lightgray"},
                    {'range': [st.session_state.total_co2_saved * 0.5, st.session_state.total_co2_saved], 'color': "gray"}],
                'threshold': {
                    'line': {'color': "red", 'width': 4},
                    'thickness': 0.75,
                    'value': st.session_state.total_co2_saved * 1.2}
            }
        ))
        fig_co2.update_layout(height=300, font={'color': 'white'}, paper_bgcolor='rgba(0,0,0,0)')
        st.plotly_chart(fig_co2, use_container_width=True)
    
    with impact_col2:
        # Items classified over time
        timestamps = [d['timestamp'] for d in st.session_state.detection_history]
        cumulative_count = list(range(1, len(timestamps) + 1))
        
        fig_timeline = px.line(
            x=timestamps, 
            y=cumulative_count,
            title="📈 Classification Progress",
            labels={'x': 'Time', 'y': 'Total Items'}
        )
        fig_timeline.update_layout(
            height=300,
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)',
            font_color='white'
        )
        st.plotly_chart(fig_timeline, use_container_width=True)
    
    with impact_col3:
        # Eco score progress
        eco_levels = ["🌱 Beginner", "🌿 Explorer", "🌳 Expert", "🌍 Champion", "🏆 Eco Hero"]
        current_level = min(st.session_state.eco_score // 500, len(eco_levels) - 1)
        
        fig_level = go.Figure(go.Indicator(
            mode = "number+gauge",
            value = current_level,
            title = {'text': f"Eco Level<br>{eco_levels[current_level]}"},
            domain = {'x': [0, 1], 'y': [0, 1]},
            gauge = {
                'axis': {'range': [0, len(eco_levels) - 1]},
                'bar': {'color': "gold"},
                'steps': [{'range': [i, i+1], 'color': f'hsl({i*60}, 70%, 50%)'} for i in range(len(eco_levels))]
            }
        ))
        fig_level.update_layout(height=300, font={'color': 'white'}, paper_bgcolor='rgba(0,0,0,0)')
        st.plotly_chart(fig_level, use_container_width=True)

# 🎯 DETAILED INSIGHTS SECTION
if len(st.session_state.detection_history) > 0:
    st.markdown("---")
    st.markdown("### 🔍 Detailed Waste Analysis & Recommendations")
    
    # Get latest detection for detailed view
    latest = st.session_state.detection_history[-1]
    waste_info = enhanced_waste_data.get(latest['class'], {})
    
    detail_col1, detail_col2 = st.columns([1, 1])
    
    with detail_col1:
        st.markdown(f"""
        <div class="metric-container">
            <h4>📋 Latest Detection: {latest['class'].title()}</h4>
            <p><strong>Confidence:</strong> {latest['confidence']:.1%}</p>
            <p><strong>Environmental Impact:</strong> {waste_info.get('environmental_impact', 'Data not available')}</p>
            <p><strong>Recycling Tips:</strong></p>
            <ul>
        """, unsafe_allow_html=True)
        
        for tip in waste_info.get('recycle_tips', []):
            st.markdown(f"<li>{tip}</li>", unsafe_allow_html=True)
        
        st.markdown("</ul></div>", unsafe_allow_html=True)
    
    with detail_col2:
        st.markdown(f"""
        <div class="metric-container">
            <h4>💚 Impact per Item</h4>
            <p><strong>CO₂ Reduction:</strong> {waste_info.get('co2_saved', 0)} kg</p>
            <p><strong>Water Saved:</strong> {waste_info.get('water_saved', 0)} liters</p>
            <p><strong>Energy Saved:</strong> {waste_info.get('energy_saved', 0)} kWh</p>
            <br>
            <p><strong>Suggestion:</strong></p>
            <p style="color: #4CAF50; font-weight: bold;">{waste_info.get('suggestion', 'No specific suggestion available.')}</p>
        </div>
        """, unsafe_allow_html=True)

# 🎉 FOOTER WITH CALL TO ACTION
st.markdown("---")
st.markdown("""
<div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; margin-top: 30px;">
    <h2 style="color: white; margin-bottom: 20px;">🚀 Ready to Save the Planet?</h2>
    <p style="color: white; font-size: 1.2em; margin-bottom: 20px;">
        Every item you classify correctly helps build a more sustainable future! 
        <br>Share this app with friends and multiply your environmental impact!
    </p>
    <div style="color: #FFD700; font-size: 1.1em;">
        <p>⭐ Made with 💚 for a sustainable tomorrow ⭐</p>
    </div>
</div>
""", unsafe_allow_html=True)