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
libCtx = pipeline.createContext([
        namespace: ["sn", "core-components-angular-lib"],
        application: [
                name: "core-components-angular-lib",
                type: "lib",
                runtime: "nodejs", // Available Platforms: nodejs, drupal
                framework: "NA",
                description: "Une librairie de composantes angular aux couleurs de la ville! Elle est basée sur la [boîte à outils v4](https://services.montreal.ca/boite-outils4/)",
                icon: "https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-lightbulb.svg",
        ],
        packaging: [
                dockerfilePath: "Dockerfile"
        ],
        notifications: [
               chat: [
                    room: 'core-components-angular-lib-notifications',
                    notify: true,
                    ],            
                mail: [
                        to: [
                                // Full email, or prefix of the email address ville.montreal.qc.ca
                                // ex: "john.doe", "joe.doh@mailinator.com"
                                "yann.debonnel"
                        ]
                ]
        ],
        debug: true  // If set to true, will print debug messages during the build
])

pipeline.start(libCtx) {

    pipeline.withSourceCode(libCtx) {

        pipeline.buildStage(libCtx) {
            pipeline.buildDockerImage(libCtx)
        }

        pipeline.prePublishStage(libCtx) {
            pipeline.publishDraftDockerImage(libCtx)
        }
    }

    pipeline.withDraftDockerImage(libCtx) {
        pipeline.testInDraftDockerContainerStage(libCtx) {

        }

       pipeline.publishStage(libCtx) {
            // pipeline.publishLibrary(libCtx)
            // les libs angular 7 ont un déploiement particulier car isolées dans un sous répertoire (/dist/core-components-angular-lib) au lieu d'être directement dans dist.
            // donc reprise du code de publishLibrary(libCtx) ci-dessous pour faire les ajustements nécessaires

            // copie du .npmrc contenant le token dans le répertoire de la lib
            sh "cp /usr/src/lib/.npmrc /usr/src/lib/dist/core-components-angular-lib"
            // génération du tag de version
            def pkgFilename = "${libCtx.dockerfileWorkingDir}/package.json";
            def pkgText = sh script: "cat ${pkgFilename}", returnStdout: true
            def pkg = HttpUtils.parseJson(pkgText);
            def version = pkg.version;
            String tag;
            if (libCtx.target.env == TargetEnv.dev) {
                version = pkg.version + "-pre.build.${libCtx.script.env.BUILD_NUMBER}";
                sh "cd ${libCtx.dockerfileWorkingDir}/dist/core-components-angular-lib && npm --no-git-tag-version version ${version}"
                tag = "next";
            }
            else {
                tag = "latest";
            }
            def returnStatusCode = 0;
            returnStatusCode = sh returnStatus: true, script: "cd ${libCtx.dockerfileWorkingDir}/dist/core-components-angular-lib && npm publish --tag ${tag} --unsafe-perm --registry https://nexus.interne.montreal.ca/repository/npm-vdmtl/ --userconfig .npmrc";

            if (returnStatusCode == 0) {
                libCtx.logger.info("La version ${version} de la librairie core-components-angular-lib à été publiée dans Nexus.");
                libCtx.chatNotify(Strings.publication.success(libCtx.config.application.name, version), true, Color.GREEN);
            } else {
                throw new Exception("Une erreur est survenue lors de la publication de core-components-angular-lib")
            }
        }

    }
}

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
        description: "This is the Storybook documentation for core-components-angular-lib (bao)",
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
                image: "node:10-alpine",
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
        approvers: ["udeboya"]
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
                "yann.debonnel",
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
                sh "npm i"
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

