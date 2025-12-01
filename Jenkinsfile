#!groovy
@Library('cicd-lib')
import vdmtl.cicd.*
import jenkins.model.*
import vdmtl.cicd.deployment.TargetEnv
import vdmtl.cicd.http.HttpUtils

import java.awt.Color

pipeline = new Pipeline()

// For more information on the configuration options,
// see https://bitbucket.org/villemontreal/cicd-lib/src/master/docs/Config.md
sbCtx = pipeline.createContext([
    namespace: ["sn","components"],
    application: [
        name: "core-components-angular-lib-storybook",
        type: "service",
        tier: "backend",
        runtime: "nginx",
        framework: "Angular",
        keywords: ["documentation", "Angular", "components", "Storybook"],
        //labels: [key1: "infra", key2: "security"],
        description: "This is the Storybook documentation for angular-ui (bao)",
        //icon: "https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-lightbulb.svg"
    ],
    build: [
        containers: [
            // [
            //     name: "hugo",
            //     image: "cibuilds/hugo:0.62.2",
            //     ttyEnabled: true,
            //     command: "cat",
            //     alwaysPullImage: true,
            // ],
            [
                name: "nodejs",
                image: "node:22.21.1-alpine",
                ttyEnabled: true,
                command: "cat",
            ],
            pipeline.createCicdToolsContainerDefinition(),
        ]
    ],
    packaging: [
        dockerfilePath: "./Dockerfile.storybook",  // The location of the Dockerfile to use
    ],
    execution: [
        service: [
            port: 80
        ],
        resources: [
            minCpu: "100m",
            minMemory: "128Mi",
            maxCpu: "500m",
            maxMemory: "556Mi"
        ],
        autoScaling: [
            minReplicas: 1,
            maxReplicas: 3,
            cpuUsagePercentage: 70
        ],
        probes: [
            liveness: [
                enabled: true,
                path: '/',
            ],
            readiness: [
                enabled: true,
                path: '/',
            ],
        ],
        monitoring: [
                enabled: false,
        ],
    ],
    ingress: [
        hosts: [
            [
                uri: 'services.kube.<ENV>.ile.montreal.qc.ca',
                paths: [
                    '/bao-storybook'
                ]
            ],
            [
                uri : "services.<ENV>.interne.montreal.ca",
                paths: [
                    '/bao-storybook'
                ]
            ],
            [
                uri : "services.<ENV>.montreal.ca",
                paths: [
                    '/bao-storybook'
                ]
            ]
        ]
    ],
    approval: [
        enabled: false,
        approvers: ["usamtol"]
    ],
    notifications: [
        chat: [
            room: "core-components-angular-lib-notifications",
            notify: true
        ],
        mail: [
            to: [
                // Full email, or prefix of the email address ville.montreal.qc.ca
                // ex: "john.doe", "jane.dear@mailinator.com"
                // Note that the code U (e.g., udev123) will not work since there
                // is no email using that id.
                "tola.sam",
                "olivier.albertini"
            ]
        ]
    ],
    vars: [
    ],
    secrets : [

    ],
])

pipeline.start(sbCtx) {

    pipeline.withSourceCode(sbCtx) {
        // Build the static storybook
        // that will be stored in a container and served by a NGINX server.
        pipeline.buildStage(sbCtx) {
            // first, regen the static web assets used by the Hugo site
            container("nodejs") {
                sh "npm ci --ignore-scripts"
                sh "npm run build-storybook"
            }
            // finally, build the image
            pipeline.buildDockerImage(sbCtx)
        }

        pipeline.prePublishStage(sbCtx) {
            pipeline.publishDraftDockerImage(sbCtx)
        }
    }

    pipeline.withDraftDockerImage(sbCtx) {
        pipeline.testInDraftDockerContainerStage(sbCtx) {
        }

        pipeline.publishStage(sbCtx) {
            pipeline.publishDockerImage(sbCtx)
        }

        pipeline.deployStage(sbCtx) {
            pipeline.deployApp(sbCtx)
        }
    }
}

