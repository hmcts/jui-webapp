import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { ExchangeService } from './exchange.service';

describe('ExchangeService', () => {
    beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [ ExchangeService, Injectable ]
        });
    });

    it('should be created', inject([ExchangeService], (service: ExchangeService) => {
    expect(service).toBeTruthy();
    }));
});
