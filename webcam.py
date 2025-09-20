from ultralytics import YOLO
import cv2

# Load your trained classification model
model = YOLO("runs/classify/train2/weights/best.pt")

# Open webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Run classification
    results = model(frame)

    # Get top prediction
    pred_class = results[0].probs.top1
    confidence = results[0].probs.top1conf.item()
    class_name = model.names[pred_class]

    # Show class + confidence on the frame
    cv2.putText(frame, f"{class_name} ({confidence:.2f})", (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

    cv2.imshow("Waste Classification", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
