import mongoose, { Schema } from "mongoose";

const deviceListSchema = new Schema(
    {
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
            processor: {
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
            }
        },
        cameraSystem: {
            rearCamera: {
                noofCamerasMP: {
                    type: String
                },
                videoRecording: {
                    type: String
                },
                features: {
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
            batteryCapacity: {
                type: String,
                required: true
            },
            chargingSpeed: {
                type: String,
                required: true
            },
            batteryType: {
                type: String,
                required: true
            },
            usbType: {
                type: String
            },
            features: {
                type: String
            }
        },
        connectivity: {
            generation: {
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
            }
        },
        securitySensors: {
            fingerprint: {
                type: String
            },
            faceUnlock: {
                type: String
            },
            irisScanner: {
                type: String
            },
            otherSensors: {
                type: String
            }
        },
        additionalFeatures: {
            gamingFeatures: {
                type: String
            },
            aiFeatures: {
                type: String
            }
        }
    },
    {
        timestamps: true,
    }
);

export const Device = mongoose.model("Device", deviceSchema);
