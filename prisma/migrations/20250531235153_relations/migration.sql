-- AddForeignKey
ALTER TABLE `Readme` ADD CONSTRAINT `Readme_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
