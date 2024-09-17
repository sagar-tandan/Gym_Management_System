using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using api.Data;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/inventory")]
    public class InventoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InventoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(int pageNumber = 1, int pageSize = 8)
        {
            var totalRecords = await _context.Inventories.CountAsync();

            var allData = await _context.Inventories
                                        .Skip((pageNumber - 1) * pageSize)
                                        .Take(pageSize)
                                        .ToListAsync();
            if (allData == null)
            {
                return NotFound();
            }

            var allDataDto = allData.Select(data => new InventoryDto
            {
                Id = data.Id,
                ImageUrl = data.ImageUrl,
                ItemName = data.ItemName,
                Quantity = data.Quantity,
                Defect = data.Defect,
                Price = data.Price
            });

            var paginationResult = new
            {
                TotalRecords = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize,
                inventory = allDataDto
            };

            return Ok(paginationResult);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getAllData([FromRoute] int id)
        {

            var searchedData = await _context.Inventories.FindAsync(id);

            if (searchedData == null)
            {
                return NotFound();
            }

            var searchedDto = new InventoryDto
            {
                Id = searchedData.Id,
                ImageUrl = searchedData.ImageUrl,
                ItemName = searchedData.ItemName,
                Quantity = searchedData.Quantity,
                Defect = searchedData.Defect,
                Price = searchedData.Price
            };

            return Ok(searchedDto);

        }

        [HttpPost]
        public async Task<IActionResult> CreateInventory([FromBody] InventoryDto inventoryDto)
        {
            var inventory = new Inventory
            {
                ImageUrl = inventoryDto.ImageUrl,
                ItemName = inventoryDto.ItemName,
                Quantity = inventoryDto.Quantity,
                Defect = inventoryDto.Defect,
                Price = inventoryDto.Price
            };

            try
            {
                await _context.Inventories.AddAsync(inventory);
                await _context.SaveChangesAsync();
                return Ok(inventory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInventory(int id, [FromBody] InventoryDto inventoryDto)
        {
            var InventoryToBeUpdated = await _context.Inventories.FindAsync(id);

            if (InventoryToBeUpdated == null)
            {
                return NotFound()
;
            }

            InventoryToBeUpdated.ImageUrl = inventoryDto.ImageUrl;
            InventoryToBeUpdated.ItemName = inventoryDto.ItemName;
            InventoryToBeUpdated.Quantity = inventoryDto.Quantity;
            InventoryToBeUpdated.Price = inventoryDto.Price;
            InventoryToBeUpdated.Defect = inventoryDto.Defect;

            _context.Entry(InventoryToBeUpdated).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(InventoryToBeUpdated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventory([FromRoute] int id)
        {
            var inventoryToBeDeleted = await _context.Inventories.FindAsync(id);
            if (inventoryToBeDeleted == null)
            {
                return BadRequest();
            }
            _context.Inventories.Remove(inventoryToBeDeleted);
            await _context.SaveChangesAsync();

            return Ok(new { message = "The Equipment has been deleted Successfully!" });
        }
    }
}