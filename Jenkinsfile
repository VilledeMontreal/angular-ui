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
ctx = pipeline.createContext([
        namespace: ["sn", "core-components-angular-lib"],
        application: [
                name: "core-components-angular-lib",
                tier: "lib",
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

pipeline.start(ctx) {

    pipeline.withSourceCode(ctx) {

        pipeline.buildStage(ctx) {
            pipeline.buildDockerImage(ctx)
        }

        pipeline.prePublishStage(ctx) {
            pipeline.publishDraftDockerImage(ctx)
        }
    }

    pipeline.withDraftDockerImage(ctx) {
        pipeline.testInDraftDockerContainerStage(ctx) {

        }

       pipeline.publishStage(ctx) {
            // pipeline.publishLibrary(ctx)
            // les libs angular 7 ont un déploiement particulier car isolées dans un sous répertoire (/dist/core-components-angular-lib) au lieu d'être directement dans dist.
            // donc reprise du code de publishLibrary(ctx) ci-dessous pour faire les ajustements nécessaires

            // copie du .npmrc contenant le token dans le répertoire de la lib
            sh "cp /usr/src/lib/.npmrc /usr/src/lib/dist/core-components-angular-lib"
            // génération du tag de version
            def pkgFilename = "${ctx.dockerfileWorkingDir}/package.json";
            def pkgText = sh script: "cat ${pkgFilename}", returnStdout: true
            def pkg = HttpUtils.parseJson(pkgText);
            def version = pkg.version;
            String tag;
            if (ctx.target.env == TargetEnv.dev) {
                version = pkg.version + "-pre.build.${ctx.script.env.BUILD_NUMBER}";
                sh "cd ${ctx.dockerfileWorkingDir}/dist/core-components-angular-lib && npm --no-git-tag-version version ${version}"
                tag = "next";
            }
            else {
                tag = "latest";
            }
            def returnStatusCode = 0;
            returnStatusCode = sh returnStatus: true, script: "cd ${ctx.dockerfileWorkingDir}/dist/core-components-angular-lib && npm publish --tag ${tag} --unsafe-perm --registry https://nexus.interne.montreal.ca/repository/npm-vdmtl/ --userconfig .npmrc";

            if (returnStatusCode == 0) {
                ctx.logger.info("La version ${version} de la librairie core-components-angular-lib à été publiée dans Nexus.");
                ctx.chatNotify(Strings.publication.success(ctx.config.application.name, version), true, Color.GREEN);
            } else {
                throw new Exception("Une erreur est survenue lors de la publication de core-components-angular-lib")
            }
        }

    }
}
