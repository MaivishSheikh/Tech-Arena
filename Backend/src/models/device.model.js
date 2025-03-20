import mongoose, { Schema } from "mongoose";

const deviceSchema = new Schema(
    {
        deviceID: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        subCategory: {
            type: String,
            required: true,
        },
        deviceImage: {
            type: String,
            required: true,
        },
        alternateImage: {
            type: String,
        },
        generalInfo: {
            brandModel: {
                type: String,
                required: true,
            },
            launchDate: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true
            }
        },
        buildDesign: {
            dimensions: {
                type: String,
                required: true
            },
            weight: {
                type: String,
                required: true
            },
            colorAvailable: {
                type: String
            },
            otherFeatures: {
                type: String
            }
        },
        display: {
            size: {
                type: String,
                required: true
            },
            type: {
                type: String
            },
            resolution: {
                type: String
            }
        },
        performance: {
            cpu: {
                type: String,
                required: true
            },
            gpu: {
                type: String,
                required: true
            },
            os: {
                type: String,
                required: true
            },
            memory: {
                type: String,
                required: true
            },
            storage: {
                type: String,
                required: true
            }
        },
        cameraSystem: {
            rearCamera: {
                noofCamerasMP: {
                    type: String
                },
                features: {
                    type: String
                },
                video: {
                    type: String
                }
            },
            frontCamera: {
                megaPixels: {
                    type: String
                },
                videoRecording: {
                    type: String
                }
            }
        },
        batteryCharging: {
            batteryTC: {
                type: String,
                required: true
            },
            chargingSpeed: {
                type: String
            },
            usbType: {
                type: String
            },
            chargingFeatures: {
                type: String
            }
        },
        connectivity: {
            networkVersion: {
                type: String
            },
            wifiVersion: {
                type: String
            },
            bluetoothVersion: {
                type: String
            },
            sim: {
                type: String,
            }            
        },
        audioMultimedia: {
            speakers: {
                type: String
            },
            headphoneJack: {
                type: String,
            },
            audioSupport: {
                type: String
            },
            mic: {
                type: String
            },
            audioSupport: {
                type: String
            }
        },
        securitySensors: {
            fingerprint: {
                type: String
            },
            faceUnlock: {
                type: String
            },
            otherSensors: {
                type: String
            }
        },
        additionalFeatures: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

export const Device = mongoose.model("Device", deviceSchema);
