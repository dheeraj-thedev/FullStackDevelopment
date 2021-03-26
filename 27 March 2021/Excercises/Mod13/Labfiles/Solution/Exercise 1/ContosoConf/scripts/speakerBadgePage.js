export class speakerBadgePage {

    constructor(element) {
        this.canvas = element.querySelector("canvas");

        this.speakerId = this.canvas.getAttribute("data-speaker-id");
        this.speakerName = this.canvas.getAttribute("data-speaker-name");
        this.canvas.addEventListener("dragover", this.handleDragOver.bind(this));
        this.canvas.addEventListener("drop", this.handleDrop.bind(this));

        this.drawBadge();
    }

    handleDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy'; // Makes the browser display a "copy" cursor.
    }

    handleDrop(event) {
        event.stopPropagation();
        event.preventDefault();

        const files = event.dataTransfer.files;
        if (files.length == 0) return;

        // More than one file could have been dropped, we'll just use the first.
        const file = files[0];
        if (this.isImageType(file.type)) {
            this.readFile(file)
                .then((file) => this.loadImage(file))
                .then((file) => this.drawBadge(file));
        } else {
            alert("Please drop an image file.");
        }
    }

    drawBadge(image) {
        // TODO: Get the canvas's (this.canvas) context and assign to this.context
        this.context = this.canvas.getContext("2d");

        // TODO: Draw the following by calling the helper methods of `this`
        //       background
        //       top text
        //       speaker name
        //       image (or placeholder if no image)
        //       bar code (passing this.speakerId)
        this.drawBackground();
        this.drawTopText();
        this.drawSpeakerName();
        if (image) {
            this.drawSpeakerImage(image);
        } else {
            this.drawImagePlaceholder();
        }
        this.drawBarCode(this.speakerId);
    }

    drawBackground() {
        // TODO: Fill the canvas with a white rectangle
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawSpeakerImage(image) {
        // TODO: Draw the image on the canvas
        //       Draw only the center square of the image
        //       Draw at:
        //       x, y = 20, 20
        //       w, h = 160, 160
        const size = Math.min(image.width, image.height);
        const sourceX = image.width / 2 - size / 2;
        const sourceY = image.height / 2 - size / 2;
        this.context.drawImage(image, sourceX, sourceY, size, size, 20, 20, 160, 160);
    }

    drawImagePlaceholder() {
        this.context.strokeStyle = "2px #888";
        this.context.strokeRect(20, 20, 160, 160);
        this.context.font = "12px sans-serif";
        this.context.textBaseline = "middle";
        this.context.textAlign = "center";
        this.context.fillStyle = "black";
        this.context.fillText("Drag your profile photo here", 100, 100);
    }

    drawTopText() {
        this.context.font = "20px sans-serif";
        this.context.fillStyle = "black";
        this.context.textBaseline = "top";
        this.context.textAlign = "left";
        this.context.fillText("ContosoConf 2013 Speaker:", 200, 20);
    }

    drawSpeakerName() {
        // TODO: Draw this.speakerName on the canvas
        //       x, y = 200, 60
        //       font = 40px sans-serif
        //       fill style = black
        //       text baseline = top
        //       text align = left
        this.context.font = "40px sans-serif";
        this.context.fillStyle = "black";
        this.context.textBaseline = "top";
        this.context.textAlign = "left";
        this.context.fillText(this.speakerName, 200, 60);
    }

    drawBarCode(text) {
        text = "*" + text + "*"; // Wrap in "*" deliminators.
        const encodings = {
            "0": "bwbWBwBwb",
            "1": "BwbWbwbwB",
            "2": "bwBWbwbwB",
            "3": "BwBWbwbwb",
            "4": "bwbWBwbwB",
            "5": "BwbWBwbwb",
            "6": "bwBWBwbwb",
            "7": "bwbWbwBwB",
            "8": "BwbWbwBwb",
            "9": "bwBWbwBwb",
            "*": "bWbwBwBwb"
        };
        let x = 200, y = 140, height = 40, thick = 6, thin = 2;
        for (let charIndex = 0; charIndex < text.length; charIndex++) {
            const code = encodings[text[charIndex]];
            for (let stripeIndex = 0; stripeIndex < code.length; stripeIndex++) {
                if (stripeIndex % 2 === 0) {
                    this.context.fillStyle = "black";
                } else {
                    this.context.fillStyle = "white";
                }
                const isWideStripe = code.charCodeAt(stripeIndex) < 91;
                if (isWideStripe) {
                    this.context.fillRect(x, y, thick, height);
                    x += thick;
                } else {
                    this.context.fillRect(x, y, thin, height);
                    x += thin;
                }
            }

            if (charIndex < text.length - 1) {
                // Space between each
                this.context.fillStyle = "white";
                this.context.fillRect(x, y, thin, height);
                x += thin;
            }
        }
    }

    isImageType(type) {
        const imageTypes = ["image/jpeg", "image/jpg", "image/png"];
        return imageTypes.indexOf(type) === 0;
    }

    readFile(file) {
        // Return a new promise.
        return new Promise(function (resolve, reject) {

            const reader = new FileReader();

            reader.onload = function (loadEvent) {
                const fileDataUrl = loadEvent.target.result;

                resolve([fileDataUrl]);
            };

            reader.readAsDataURL(file);
        });
    }

    loadImage(imageUrl) {
        // Return a new promise.
        return new Promise(function (resolve, reject) {
            const image = new Image();

            image.onload = function () {
                resolve(image);
            };

            image.src = imageUrl; // This starts the image loading
        });
    }
}
// SIG // Begin signature block
// SIG // MIIdkAYJKoZIhvcNAQcCoIIdgTCCHX0CAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFMjyWpbvNfY7
// SIG // D6hjbVY99//bhgpGoIIYbjCCBN4wggPGoAMCAQICEzMA
// SIG // AAD4l+dg+wOjkMEAAAAAAPgwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE4MDgyMzIw
// SIG // MjAwM1oXDTE5MTEyMzIwMjAwM1owgc4xCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xKTAnBgNVBAsTIE1pY3Jvc29mdCBPcGVy
// SIG // YXRpb25zIFB1ZXJ0byBSaWNvMSYwJAYDVQQLEx1UaGFs
// SIG // ZXMgVFNTIEVTTjpDMEY0LTMwODYtREVGODElMCMGA1UE
// SIG // AxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZTCC
// SIG // ASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMzK
// SIG // pmym7blsPE4w0Oo0+ZLkXNFYy49KBbMCdUe0SJ+I682s
// SIG // jsh85f/L9uF7blZADHuxvFOH8FpTyb0sR0ZW13YKEFLj
// SIG // 4CMrfM0HCTFxswYJXrT1HQGdxI8XK91rOPjyp61qYeN7
// SIG // MXheAbLJZZYUz31Ki6mP3JVNtC/ox5giDJU0nug2Nmjw
// SIG // x4YndcLcw3gLs0T8utSYIJDm6O82IigPeKJ8c1zFb4dw
// SIG // fwVlUsK+CeamdBSMytQ4wClRNp2jtzOP+WM1rJMr8lFl
// SIG // V7h7BJ3cxyaOpLU/Da4tkKpZqaA/SflI8B6hwAXMeF+w
// SIG // XqaqHuy3JmouNCSUs+qIRjBuUe6hV70CAwEAAaOCAQkw
// SIG // ggEFMB0GA1UdDgQWBBQXDuW8CVnfZ6TBklgL9Efy//+I
// SIG // pTAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7syuwwzWz
// SIG // DzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWNy
// SIG // b3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsGAQUFBwEB
// SIG // BEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRUaW1l
// SIG // U3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsGAQUFBwMI
// SIG // MA0GCSqGSIb3DQEBBQUAA4IBAQA/zMY23ylG99myLXcP
// SIG // U5octGsAVQAoqREVM6QkrB562rdqSIJRFBIsTnB95xRB
// SIG // a3b5IIwlmkCq4UvnItcRrV1L7Wt9lAfp1McsvDUA+Mho
// SIG // ARTT+LGhlCNNApS77SKJXI5b3iUUad4Fw9+ymI6YB1cc
// SIG // OckvIAZDuIn/OP9Et/7LoOnHqTM7c2daBwy83IRzEaI0
// SIG // dQ9IR3YCTBhjiou385q6SH/E35odcUoYUFymorwQAKDf
// SIG // pkkk/Jge2RBcW+rFwyBN2SYFqxeihrFD8JrsPGxGap7T
// SIG // 7zPJC3s+DGlKMeTLIa+htJnR3kIfb/OaLtWzJNYIVWtq
// SIG // 3OcIRpgZmHBF4oO1MIIF/zCCA+egAwIBAgITMwAAAQNe
// SIG // JRyZH6MeuAAAAAABAzANBgkqhkiG9w0BAQsFADB+MQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNyb3Nv
// SIG // ZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExMB4XDTE4MDcx
// SIG // MjIwMDg0OFoXDTE5MDcyNjIwMDg0OFowdDELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEeMBwGA1UEAxMVTWljcm9zb2Z0IENv
// SIG // cnBvcmF0aW9uMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
// SIG // MIIBCgKCAQEA0ZR2NuaGqzb+aflGfIuIUMuQcH+wVakk
// SIG // HX455wWfD6x7l7LOcwr71JskXBa1Od0bfjNsEfw7JvOY
// SIG // ql1Ta6rD7BO40u/PV3/MZcuvTS4ysVYrTjQHif5pIb0+
// SIG // RPveEp2Fv3x2hn1ysXabYeaKZExGzrbVOox3k3dnIZy2
// SIG // WgZeR4b1PNEJyg09zbLpoVB40YSI4gE8IvyvlgjMXZnA
// SIG // 7eulWpiS9chATmpzr97jdHrTX0aXvOJnKHeZrMEOMRaP
// SIG // AA8B/kteVA/KxGU/CuOjRtv2LAM6Gb5oBRac5n80v6eH
// SIG // jWU5Jslj1O/F3b0l/v0o9DSGeawq1V8wkTvkFGrrscoE
// SIG // IwIDAQABo4IBfjCCAXowHwYDVR0lBBgwFgYKKwYBBAGC
// SIG // N0wIAQYIKwYBBQUHAwMwHQYDVR0OBBYEFEe+wMvhpj/9
// SIG // ZdY48gNdt69390D/MFAGA1UdEQRJMEekRTBDMSkwJwYD
// SIG // VQQLEyBNaWNyb3NvZnQgT3BlcmF0aW9ucyBQdWVydG8g
// SIG // UmljbzEWMBQGA1UEBRMNMjMwMDEyKzQzNzk2NTAfBgNV
// SIG // HSMEGDAWgBRIbmTlUAXTgqoXNzcitW2oynUClTBUBgNV
// SIG // HR8ETTBLMEmgR6BFhkNodHRwOi8vd3d3Lm1pY3Jvc29m
// SIG // dC5jb20vcGtpb3BzL2NybC9NaWNDb2RTaWdQQ0EyMDEx
// SIG // XzIwMTEtMDctMDguY3JsMGEGCCsGAQUFBwEBBFUwUzBR
// SIG // BggrBgEFBQcwAoZFaHR0cDovL3d3dy5taWNyb3NvZnQu
// SIG // Y29tL3BraW9wcy9jZXJ0cy9NaWNDb2RTaWdQQ0EyMDEx
// SIG // XzIwMTEtMDctMDguY3J0MAwGA1UdEwEB/wQCMAAwDQYJ
// SIG // KoZIhvcNAQELBQADggIBAJ/1yVMNPw0m7KJE2A3Rn2OW
// SIG // Bks/HlzFM6Okw2yvH8ABuutl7J4zEA+nrFvUvZBhF+cx
// SIG // 58MmtKz1J9NIk4aI/hI1kWQi0WstO6gsFZQp0jeW5jX/
// SIG // DM7IBhYWniSx4jn5bg542AwbtilgJ3Y0JJvduZd1ywE7
// SIG // rYISFiKAiRWEu5hQILAXJoZJr859RRVDNJbPgVwYLNST
// SIG // 8mer4nPIPaPN/DIeYBzpsBsw+yy7By6WhJNFKFRczZb9
// SIG // oNuB2LYwykOx80jAskYcXV52Klif1O7y9PpITLVhi7CM
// SIG // QemquJ2Q9P9qQg+5PukO7JT8jYC7eOMjp3hbsm0f+VnB
// SIG // fbbROcl54IMcYAraPbDR7Ta/RQfpGzZu5T07BQOn1Kcl
// SIG // Eo/mdqMTs0VaQzGC2tiErrmwH3X19h19URE3J+i1NYRx
// SIG // 91eqrvqJccmY0p5aZHa+jMN9FWqR8RT08tk1Mbjbcvq0
// SIG // dciIm2q/mEXHZrLX/86SkHXk6+aG0sgb2yfAW5VvSW9Y
// SIG // XWkq3lNL+OjKe/ZsFfkDGQ8RhapPmr+qV91gxvVxIPRR
// SIG // qJrK6dHrNEc9dfoi7FU/ahk5axDpWj+O9CN4MLLypjjL
// SIG // NY2qmFkkQLg6Z6QHX6D+2DtJE/sM4e0LbYNQzvB/PuDZ
// SIG // COiMIUpBwt7rjlvuA8Mdbm7mVDVmZ3J8GupS9iLEcj+u
// SIG // MIIGBzCCA++gAwIBAgIKYRZoNAAAAAAAHDANBgkqhkiG
// SIG // 9w0BAQUFADBfMRMwEQYKCZImiZPyLGQBGRYDY29tMRkw
// SIG // FwYKCZImiZPyLGQBGRYJbWljcm9zb2Z0MS0wKwYDVQQD
// SIG // EyRNaWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRo
// SIG // b3JpdHkwHhcNMDcwNDAzMTI1MzA5WhcNMjEwNDAzMTMw
// SIG // MzA5WjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQD
// SIG // ExhNaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EwggEiMA0G
// SIG // CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCfoWyx39tI
// SIG // kip8ay4Z4b3i48WZUSNQrc7dGE4kD+7Rp9FMrXQwIBHr
// SIG // B9VUlRVJlBtCkq6YXDAm2gBr6Hu97IkHD/cOBJjwicwf
// SIG // yzMkh53y9GccLPx754gd6udOo6HBI1PKjfpFzwnQXq/Q
// SIG // sEIEovmmbJNn1yjcRlOwhtDlKEYuJ6yGT1VSDOQDLPtq
// SIG // kJAwbofzWTCd+n7Wl7PoIZd++NIT8wi3U21StEWQn0gA
// SIG // SkdmEScpZqiX5NMGgUqi+YSnEUcUCYKfhO1VeP4Bmh1Q
// SIG // CIUAEDBG7bfeI0a7xC1Un68eeEExd8yb3zuDk6FhArUd
// SIG // DbH895uyAc4iS1T/+QXDwiALAgMBAAGjggGrMIIBpzAP
// SIG // BgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQjNPjZUkZw
// SIG // Cu1A+3b7syuwwzWzDzALBgNVHQ8EBAMCAYYwEAYJKwYB
// SIG // BAGCNxUBBAMCAQAwgZgGA1UdIwSBkDCBjYAUDqyCYEBW
// SIG // J5flJRP8KuEKU5VZ5KShY6RhMF8xEzARBgoJkiaJk/Is
// SIG // ZAEZFgNjb20xGTAXBgoJkiaJk/IsZAEZFgltaWNyb3Nv
// SIG // ZnQxLTArBgNVBAMTJE1pY3Jvc29mdCBSb290IENlcnRp
// SIG // ZmljYXRlIEF1dGhvcml0eYIQea0WoUqgpa1Mc1j0BxMu
// SIG // ZTBQBgNVHR8ESTBHMEWgQ6BBhj9odHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9taWNy
// SIG // b3NvZnRyb290Y2VydC5jcmwwVAYIKwYBBQUHAQEESDBG
// SIG // MEQGCCsGAQUFBzAChjhodHRwOi8vd3d3Lm1pY3Jvc29m
// SIG // dC5jb20vcGtpL2NlcnRzL01pY3Jvc29mdFJvb3RDZXJ0
// SIG // LmNydDATBgNVHSUEDDAKBggrBgEFBQcDCDANBgkqhkiG
// SIG // 9w0BAQUFAAOCAgEAEJeKw1wDRDbd6bStd9vOeVFNAbEu
// SIG // dHFbbQwTq86+e4+4LtQSooxtYrhXAstOIBNQmd16QOJX
// SIG // u69YmhzhHQGGrLt48ovQ7DsB7uK+jwoFyI1I4vBTFd1P
// SIG // q5Lk541q1YDB5pTyBi+FA+mRKiQicPv2/OR4mS4N9wfi
// SIG // cLwYTp2OawpylbihOZxnLcVRDupiXD8WmIsgP+IHGjL5
// SIG // zDFKdjE9K3ILyOpwPf+FChPfwgphjvDXuBfrTot/xTUr
// SIG // XqO/67x9C0J71FNyIe4wyrt4ZVxbARcKFA7S2hSY9Ty5
// SIG // ZlizLS/n+YWGzFFW6J1wlGysOUzU9nm/qhh6Yinvopsp
// SIG // NAZ3GmLJPR5tH4LwC8csu89Ds+X57H2146SodDW4TsVx
// SIG // IxImdgs8UoxxWkZDFLyzs7BNZ8ifQv+AeSGAnhUwZuhC
// SIG // El4ayJ4iIdBD6Svpu/RIzCzU2DKATCYqSCRfWupW76be
// SIG // mZ3KOm+9gSd0BhHudiG/m4LBJ1S2sWo9iaF2YbRuoROm
// SIG // v6pH8BJv/YoybLL+31HIjCPJZr2dHYcSZAI9La9Zj7jk
// SIG // IeW1sMpjtHhUBdRBLlCslLCleKuzoJZ1GtmShxN1Ii8y
// SIG // qAhuoFuMJb+g74TKIdbrHk/Jmu5J4PcBZW+JC33Iacjm
// SIG // buqnl84xKf8OxVtc2E0bodj6L54/LlUWa8kTo/0wggd6
// SIG // MIIFYqADAgECAgphDpDSAAAAAAADMA0GCSqGSIb3DQEB
// SIG // CwUAMIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQD
// SIG // EylNaWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRo
// SIG // b3JpdHkgMjAxMTAeFw0xMTA3MDgyMDU5MDlaFw0yNjA3
// SIG // MDgyMTA5MDlaMH4xCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xKDAm
// SIG // BgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25pbmcgUENB
// SIG // IDIwMTEwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIK
// SIG // AoICAQCr8PpyEBwurdhuqoIQTTS68rZYIZ9CGypr6VpQ
// SIG // qrgGOBoESbp/wwwe3TdrxhLYC/A4wpkGsMg51QEUMULT
// SIG // iQ15ZId+lGAkbK+eSZzpaF7S35tTsgosw6/ZqSuuegmv
// SIG // 15ZZymAaBelmdugyUiYSL+erCFDPs0S3XdjELgN1q2jz
// SIG // y23zOlyhFvRGuuA4ZKxuZDV4pqBjDy3TQJP4494HDdVc
// SIG // eaVJKecNvqATd76UPe/74ytaEB9NViiienLgEjq3SV7Y
// SIG // 7e1DkYPZe7J7hhvZPrGMXeiJT4Qa8qEvWeSQOy2uM1jF
// SIG // tz7+MtOzAz2xsq+SOH7SnYAs9U5WkSE1JcM5bmR/U7qc
// SIG // D60ZI4TL9LoDho33X/DQUr+MlIe8wCF0JV8YKLbMJyg4
// SIG // JZg5SjbPfLGSrhwjp6lm7GEfauEoSZ1fiOIlXdMhSz5S
// SIG // xLVXPyQD8NF6Wy/VI+NwXQ9RRnez+ADhvKwCgl/bwBWz
// SIG // vRvUVUvnOaEP6SNJvBi4RHxF5MHDcnrgcuck379GmcXv
// SIG // whxX24ON7E1JMKerjt/sW5+v/N2wZuLBl4F77dbtS+dJ
// SIG // KacTKKanfWeA5opieF+yL4TXV5xcv3coKPHtbcMojyyP
// SIG // QDdPweGFRInECUzF1KVDL3SV9274eCBYLBNdYJWaPk8z
// SIG // hNqwiBfenk70lrC8RqBsmNLg1oiMCwIDAQABo4IB7TCC
// SIG // AekwEAYJKwYBBAGCNxUBBAMCAQAwHQYDVR0OBBYEFEhu
// SIG // ZOVQBdOCqhc3NyK1bajKdQKVMBkGCSsGAQQBgjcUAgQM
// SIG // HgoAUwB1AGIAQwBBMAsGA1UdDwQEAwIBhjAPBgNVHRMB
// SIG // Af8EBTADAQH/MB8GA1UdIwQYMBaAFHItOgIxkEO5FAVO
// SIG // 4eqnxzHRI4k0MFoGA1UdHwRTMFEwT6BNoEuGSWh0dHA6
// SIG // Ly9jcmwubWljcm9zb2Z0LmNvbS9wa2kvY3JsL3Byb2R1
// SIG // Y3RzL01pY1Jvb0NlckF1dDIwMTFfMjAxMV8wM18yMi5j
// SIG // cmwwXgYIKwYBBQUHAQEEUjBQME4GCCsGAQUFBzAChkJo
// SIG // dHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRz
// SIG // L01pY1Jvb0NlckF1dDIwMTFfMjAxMV8wM18yMi5jcnQw
// SIG // gZ8GA1UdIASBlzCBlDCBkQYJKwYBBAGCNy4DMIGDMD8G
// SIG // CCsGAQUFBwIBFjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2RvY3MvcHJpbWFyeWNwcy5odG0wQAYI
// SIG // KwYBBQUHAgIwNB4yIB0ATABlAGcAYQBsAF8AcABvAGwA
// SIG // aQBjAHkAXwBzAHQAYQB0AGUAbQBlAG4AdAAuIB0wDQYJ
// SIG // KoZIhvcNAQELBQADggIBAGfyhqWY4FR5Gi7T2HRnIpsL
// SIG // lhHhY5KZQpZ90nkMkMFlXy4sPvjDctFtg/6+P+gKyju/
// SIG // R6mj82nbY78iNaWXXWWEkH2LRlBV2AySfNIaSxzzPEKL
// SIG // UtCw/WvjPgcuKZvmPRul1LUdd5Q54ulkyUQ9eHoj8xN9
// SIG // ppB0g430yyYCRirCihC7pKkFDJvtaPpoLpWgKj8qa1hJ
// SIG // Yx8JaW5amJbkg/TAj/NGK978O9C9Ne9uJa7lryft0N3z
// SIG // Dq+ZKJeYTQ49C/IIidYfwzIY4vDFLc5bnrRJOQrGCsLG
// SIG // ra7lstnbFYhRRVg4MnEnGn+x9Cf43iw6IGmYslmJaG5v
// SIG // p7d0w0AFBqYBKig+gj8TTWYLwLNN9eGPfxxvFX1Fp3bl
// SIG // QCplo8NdUmKGwx1jNpeG39rz+PIWoZon4c2ll9DuXWNB
// SIG // 41sHnIc+BncG0QaxdR8UvmFhtfDcxhsEvt9Bxw4o7t5l
// SIG // L+yX9qFcltgA1qFGvVnzl6UJS0gQmYAf0AApxbGbpT9F
// SIG // dx41xtKiop96eiL6SJUfq/tHI4D1nvi/a7dLl+LrdXga
// SIG // 7Oo3mXkYS//WsyNodeav+vyL6wuA6mk7r/ww7QRMjt/f
// SIG // dW1jkT3RnVZOT7+AVyKheBEyIXrvQQqxP/uozKRdwaGI
// SIG // m1dxVk5IRcBCyZt2WwqASGv9eZ/BvW1taslScxMNelDN
// SIG // MYIEjjCCBIoCAQEwgZUwfjELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEoMCYGA1UEAxMfTWljcm9zb2Z0IENvZGUgU2lnbmlu
// SIG // ZyBQQ0EgMjAxMQITMwAAAQNeJRyZH6MeuAAAAAABAzAJ
// SIG // BgUrDgMCGgUAoIGiMBkGCSqGSIb3DQEJAzEMBgorBgEE
// SIG // AYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEEAYI3
// SIG // AgEVMCMGCSqGSIb3DQEJBDEWBBRwdLgKMPMkZcE6/71l
// SIG // 5epShOGRIDBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAKdpKiLu
// SIG // ukosf262DNzWeg1FICPVKnVz69DutHdKRuG+zYtuX4Bt
// SIG // ZcDMdkX8ftaCK+Fsew/g+GPfL698b3E/VIgL5YF2pHpE
// SIG // epsk0xSljhycpB4GkugeAVZh2R3jkG9O1egS1bgqVr/N
// SIG // McTqNXLB7W433G32q1ep2KSD87ETX+zgEkkyvtofWPKj
// SIG // 5IK5zHj5cAbiCUz5O5+kTrLKRKPAU8dL4KNbdTqgdzVC
// SIG // zarvNPLIFPZQMS29bEY08dIAUB+tm7dkS0s0ukCkLcQX
// SIG // D4qiokNreGi740Kcz2e8hhJr1x2hcJVI4MLYK8VereFw
// SIG // GBsVLOTNpVkfQ98lHTAqtemoeUihggIoMIICJAYJKoZI
// SIG // hvcNAQkGMYICFTCCAhECAQEwgY4wdzELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEhMB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBAhMzAAAA+JfnYPsDo5DBAAAAAAD4MAkG
// SIG // BSsOAwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcN
// SIG // AQcBMBwGCSqGSIb3DQEJBTEPFw0xODEwMTYwMzA5MjVa
// SIG // MCMGCSqGSIb3DQEJBDEWBBRPiwuS+jkhmOVW76X1zOhv
// SIG // WHmezTANBgkqhkiG9w0BAQUFAASCAQBOjIsQGBI0mfMc
// SIG // PZ/0Y7RRuiyVzix8iXaS1QSD4bsUpz20ZVjDFs+fv5la
// SIG // v88boUbwEB1XdS82jmogmMEOFE3DhFsrDC5nfOsENV0d
// SIG // u/xwFgXPopf0SHXPQ9aZmJnQTA1puS29TFDhI5F6xS4a
// SIG // sVKWkwz64jYqXotG7OWJ5FVMjegcyJPPG4XMWfqvALGu
// SIG // vRFp4rd1iaXc4gfRDHqyTzJ6R+qzU0x9tIgHbjgUbo64
// SIG // GobhDBoifeKaQ8WoGchqkFfSPKDqP7zPrtegpcWSzLZi
// SIG // hf2VS2+xC3/yCrKbgePDY5lMOzFEd0myItR/1Tk+bxog
// SIG // +wFsE9Djtz6Kkh5FtD2K
// SIG // End signature block
