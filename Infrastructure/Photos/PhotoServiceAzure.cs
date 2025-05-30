using System;
using Application.Interfaces;
using Application.Profiles.DTOs;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos;

public class PhotoServiceAzure : IPhotoService
{
    private readonly BlobContainerClient _containerClient;

        public PhotoServiceAzure(IOptions<AzureBlobSettings> config)
        {
            var blobServiceClient = new BlobServiceClient(config.Value.ConnectionString);
            _containerClient = blobServiceClient.GetBlobContainerClient(config.Value.ContainerName);
            _containerClient.CreateIfNotExists(PublicAccessType.Blob);
        }

        public async Task<PhotoUploadResult?> UploadPhoto(IFormFile file)
        {
            if (file.Length > 0)
            {
                var blobClient = _containerClient.GetBlobClient(Guid.NewGuid() + Path.GetExtension(file.FileName));
                await using var stream = file.OpenReadStream();
                await blobClient.UploadAsync(stream, new BlobHttpHeaders { ContentType = file.ContentType });

                return new PhotoUploadResult
                {
                    PublicId = blobClient.Name,
                    Url = blobClient.Uri.ToString()
                };
            }

            return null;
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var blobClient = _containerClient.GetBlobClient(publicId);
            var response = await blobClient.DeleteIfExistsAsync();

            return response ? "ok" : "not found";
        }
}
